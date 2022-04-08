import React, {useReducer, useEffect, useState} from 'react'
import { TYPES } from '../actions/actions';
import { foodReducer, initialState } from '../reducers/reducers'
import Cards from './Cards';
import Cart from './Cart';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import SearchAppBar from './SearchBar'; 
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function Home() {
    const [state, dispatch] = useReducer(foodReducer, initialState)
    const {products, cart} = state;

    const [spacing, setSpacing] = React.useState(2);
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;}
      setOpen(false);
    };

   ///Llamado a la API para obtener los datos
    const loadProducts = async () => {
      let info = await axios.get('https://ait-tesapi.herokuapp.com/products')
      let data = info.data.products.map(e => {
        return{
          _id : e._id,
          name: e.name,
          image: e.image,
          description: e.description,
          price: e.price.slice(1),
          stock: e.stock
        }
      })
      dispatch({type:TYPES.LOAD_PRODUCTS, payload: data})
    }
    let total = 0
    
    ///Post a la API cuando se vende una orden
    const saleProducts = async (cart) => {
      let payload = { cart };
      let res = await axios.post('https://ait-tesapi.herokuapp.com/sales', payload);
      let data = res.data;
      console.log(data);
      dispatch({type:TYPES.SALE})
    }
    

    const confirm = (cart) => {
      saleProducts(cart)
      handleClick()
    }

    useEffect(() => {
      loadProducts()    
      return () => {}}, [])
    
    const addToCart = (_id)=>{  
      dispatch({type:TYPES.ADD_TO_CART, payload:_id})
    }

    const delFromCart = (_id, all= false)=>{
      if(all){
        dispatch({type:TYPES.REMOVE_ALL_FROM_CART, payload:_id})
      }else{
        dispatch({type:TYPES.REMOVE_ONE_FROM_CART, payload:_id})
      }
    }

    const clearCart = ()=>{
      dispatch({type:TYPES.CLEAR_CART})
    }


  ///////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <SearchAppBar/>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Compra realizada con exito!
        </Alert>
      </Snackbar>
      <Grid container sx={{bgcolor: '#EBFCEC'}}>

      <Grid sx={{ flexGrow: 1 }} xs={8} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center"  spacing={spacing} sx={{marginTop:'1.5%', marginBlockEnd:'1.5%', marginLeft: '5px'}}>
          {products.map((product) => (
            <Grid key={product._id} item sx={{ marginLeft: '5%' }}>
              <Cards key={product._id} data={product} addToCart={addToCart}/>
            </Grid>
          ))}
        </Grid>
      </Grid>
      </Grid>
        <Grid item xs={12} sm={4} sx={{ marginTop: '1.5%', width: '100%'  }} >
          <Item>
            <Grid item   sx={{ width: '100%'}} >
       <Button variant='contained'  color='error' onClick={clearCart}>CLEAR CART</Button>

       { cart.length === 0 ? <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'"Helvetica Neue"'}}> El carrito esta vacio  </Typography> 
        :  cart.map((e, index) => <Cart key={index} data={e} delFromCart={delFromCart} addToCart={addToCart}/>)}
       {cart.length > 0 ?
        cart.map(e =>  {
        total += e.price * e.quantity
        return true })
                : false}
           
          <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'"Helvetica Neue"'}}>
          Total:  {(total).toFixed(2)}
          </Typography>

          {cart.length > 0 ?
          <Button variant="contained" sx={{bgcolor:'green'}} onClick={() => {confirm(cart)}}>
          CONFIRM
        </Button>    
                : false}
          
       </Grid></Item>
        </Grid>
        </Grid> 
    </div>
  )
  
}

export default Home