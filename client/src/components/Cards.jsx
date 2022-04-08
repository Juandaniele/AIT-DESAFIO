import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Cards({data, addToCart}) {
  let {_id, name, price, stock, description, image, quantity} = data;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const sub = 'Stock: ' + stock

  return (
     <Card sx={{ width: 300 , maxWidth: 345,  boxShadow: 10 , bgcolor: 'rgba(106, 169, 138, 0.7)', fontFamily:'"Helvetica Neue"'}}>
     <CardHeader
       title= {name}
       subheader= {sub}
       
     />
     <CardMedia 
       component="img"
       height="194"
       image={image}
       alt= {name}
       
     />
     <CardContent>
       <Typography variant="body2" color="Black" sx={{fontFamily:'"Helvetica Neue"', fontSize:25}}>
         Price: ${price}
       </Typography>
     </CardContent>
     <CardActions disableSpacing>
       { stock > 0 ?
          <Button variant="contained" size="small" sx={{ marginBlockEnd: '1.5%', bgcolor:'rgba(0, 0, 0, 0.5)'}} onClick={() => addToCart(_id)}>
          ADD TO CART <AddShoppingCartIcon/>
        </Button> 
        : 
        <Button variant="contained" size="small" disabled sx={{ marginBlockEnd: '1.5%', bgcolor:'rgba(0, 0, 0, 0.9)'}}>
          ADD TO CART <AddShoppingCartIcon/>
        </Button>
        }
       <ExpandMore
         expand={expanded}
         onClick={handleExpandClick}
         aria-expanded={expanded}
         aria-label="show more"
       >
         <ExpandMoreIcon />
       </ExpandMore>
     </CardActions>
     <Collapse in={expanded} timeout="auto" unmountOnExit>
       <CardContent>
         <Typography paragraph sx={{fontFamily:'"Helvetica Neue"', fontSize:20}}>Method:</Typography>
         <Typography paragraph sx={{fontFamily:'"Helvetica Neue"', fontSize:18}}>
           {description}
         </Typography>
         
       </CardContent>
     </Collapse>
   </Card>
  );
}