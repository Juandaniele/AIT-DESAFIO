import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


export default function Cart  ({data, delFromCart, addToCart}) {
    let {_id, name, price, image, stock, quantity} = data;
    
    let total = (price * quantity).toFixed(2)
    
  return (
    <div >
      <List sx={{ width: '85%' }}>
      <ListItem >
        <ListItemAvatar>
          <Avatar src={image}/>
          
        </ListItemAvatar>
        <ListItemText primary={name} secondary={quantity} sx={{ width: '100%'}}/>
        { quantity > 1 ?
        <Button sx={{ padding: 0}} onClick={() => delFromCart(_id)} size="small"><ArrowDownwardIcon sx={{color:'black'}}/></Button> : <Button sx={{ padding: 0}} disabled size="small"><ArrowDownwardIcon/></Button>}
        { quantity < stock ?
        <Button onClick={() => addToCart(_id)} size="small"><ArrowUpwardIcon sx={{color:'black'}}/></Button> : <Button disabled size="small"><ArrowUpwardIcon/></Button>}
        <Button onClick={() => delFromCart(_id, true)}><DeleteIcon sx={{color:'black'}}/></Button>
        
        <ListItemText> ${total} </ListItemText>
      </ListItem>
    </List>
    
        
        
            
        </div>
  )
}

 