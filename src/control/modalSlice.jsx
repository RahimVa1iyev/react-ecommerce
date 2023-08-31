import  { createSlice } from '@reduxjs/toolkit';

const initialState ={
    modalOpen : false,
    selectedProduct:0,
    compareProduct : [],
    activeIcon:""
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
        }

    },

})


export const { handleOpen, handleClose , setSelectedProduct , setCompareProduct ,handleEye,handleScale,removeFromCompareProduct } = modalSlice.actions;
export default modalSlice.reducer