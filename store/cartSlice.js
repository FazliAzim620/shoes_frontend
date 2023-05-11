import { createSlice } from "@reduxjs/toolkit";
export const cartSlice=createSlice({
name:'cart',
initialState:{
cartItems:[],
},
reducers:{
addToCart:(state,action)=>{
    // state.cartItems.push(action.payload);
    const item=state.cartItems.find((p)=>p.id===action.payload.id)
    if(item){
       item.quantity++;
       item.attributes.price=item.oneQuantityPrice*item.quantity
    
    }else{
    state.cartItems.push({...action.payload,quantity:1});
    }

   
},

UPDATE_CART:(state,action)=>{
    if(action?.payload?.key==='increase'){
        const item=state.cartItems.find((p)=>p.id===action.payload?.val.id)
        if(item?.quantity>10){
        alert('more then 10 not allowed')
    }
        else{
        item.quantity++;
        item.attributes.price=item.oneQuantityPrice*item.quantity
        }
    }
    if(action?.payload?.key==='decrease'){
        const item=state.cartItems.find((p)=>p.id===action.payload.val.id)
        if(item?.quantity==1){
        alert('quantity must be one')}
        else{
        item.quantity--;
        item.attributes.price=item.oneQuantityPrice*item.quantity
        }
    
    }
    if(action?.payload?.key==='size'){
        const item=state.cartItems.find((p)=>p.id===action.payload.val.id)
        item.selectedSize=action.payload.size
    
    
    }
 
},
DELETE_CART_ITEM:(state,action)=>{
    state.cartItems=state.cartItems.filter((cart)=>cart.id!==action.payload.id)
  
}
}

})
export const{addToCart,UPDATE_CART,DELETE_CART_ITEM}=cartSlice.actions;
export default cartSlice.reducer;