import  { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState ={
    modalOpen : false,
    selectedProduct:0,
    compareProduct : [],
    activeIcon:"",
    orderItems:[],

}

const modalSlice = createSlice({
    name :"cart",
    initialState,
    reducers :{
        handleOpen : (state)=>{
            state.modalOpen =true;
        },

        handleClose :(state)=>{
            state.modalOpen = false;
        },

        setSelectedProduct : (state,action)=>{
            state.selectedProduct = action.payload;
        },

        removeFromCompareProduct: (state, action) => {
            state.compareProduct = state.compareProduct.filter(item => item.id !== action.payload);
          },
        setCompareProduct : (state,action)=>{
            state.compareProduct = action.payload;
        },

        handleEye :(state)=>{
            state.activeIcon ="eye";
        },

        handleScale :(state)=>{
            state.activeIcon ="scale";
        },

        handleView :(state)=>{
            state.activeIcon = "view";
        },
        setOrderItem: (state,action) => {
            state.orderItems = action.payload;
        }

    },

})


export const getBasketItems = (id) => async (dispatch) => {
    console.log("id",id);
    try {
        const token = localStorage.getItem('authToken')
        const response = await axios.get(`https://localhost:7039/api/Orders/orderitems/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch(setOrderItem(response.data));
    } catch (error) {
    console.log(error.response.data);
};
}


export const { handleOpen, handleClose , setSelectedProduct , setCompareProduct ,handleEye,handleView,handleScale,removeFromCompareProduct,setOrderItem } = modalSlice.actions;
export default modalSlice.reducer