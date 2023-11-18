import  { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState ={
    modalOpen : false,
    confirmModalOpen : false,
    userId :'',
    selectedProduct:0,
    compareProduct : [],
    activeIcon:"",
    orderItems:[],
    email:'',
    compareCount : 0,
    errors:[],
    ids: []
}
console.log("slice",initialState.email);

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
        setIds : (state,action)=>{
            state.ids = action.payload
        },
        handleConfirmModalOpen : (state)=>{
            state.confirmModalOpen =true;
        },

        handleConfirmModalClose :(state)=>{
            state.confirmModalOpen = false;
        },

        setSelectedProduct : (state,action)=>{
            state.selectedProduct = action.payload;
        },
        setUserId : (state,action)=>{
            state.userId = action.payload;
        },
        removeFromCompareProduct: (state, action) => {
            state.compareProduct = state.compareProduct.filter(item => item.id !== action.payload);
          },
        setCompareProduct : (state,action)=>{
            state.compareProduct = action.payload;
        },
        setError :(state,action)=>{
            state.errors = action.payload;
        },

        handleEye :(state)=>{
            state.activeIcon ="eye";
        },

        handleScale :(state)=>{
            state.activeIcon ="scale";
        },

        handleView :(state)=>{
            state.activeIcon ="view";
        },

        setOrderItem: (state,action) => {
            state.orderItems = action.payload;
        },
        setEmail: (state,action)=>{
            state.email = action.payload
        } ,
        setCompareCount : (state,action) =>{
            state.compareCount += action.payload
        },


    },

})


export const getOrderItems = (id) => async (dispatch) => {
    console.log("id",id);
    try {
        const token = localStorage.getItem('authToken')
        const response = await axios.get(`https://api-project-ecommerce.azurewebsites.net/api/Orders/orderitems/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch(setOrderItem(response.data));
    } catch (error) {
    console.log(error.response.data);
};
}

export const createUser = (values) => async (dispatch) => {
    console.log("id",values);
    try {
        await axios.post(`https://api-project-ecommerce.azurewebsites.net/api/Users/register`, values)
        .then(res => {console.log("User created succesfully") 
         dispatch(handleConfirmModalOpen())
         dispatch(setUserId(res.data.id.id)) } )
    } catch (error){
        if (error.response.status === 400)
        error.response.data.errors.forEach(err => dispatch(setError(err.errorMessage)));
      else if (error.response.status === 404)
        console.log('Not Found')
      else {
        console.log("An unexpected error occurred ");
      }
    }   
};



export const { handleOpen,setIds,setError, handleClose, setUserId ,handleConfirmModalClose,handleConfirmModalOpen, setSelectedProduct , setCompareProduct ,handleEye,handleView,handleScale,removeFromCompareProduct,setOrderItem,setEmail,setCompareCount } = modalSlice.actions;
export default modalSlice.reducer