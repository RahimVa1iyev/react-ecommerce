import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const initialState = {
    token :localStorage.getItem('authToken'),
    orders: [],
    login : false,
    messages : [],
    message: '',
    errors : [],
    reviewCount:0,
    navId:1
};


const fetchSlice = createSlice({
    name: "fetch",
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.orders = action.payload;
        },
        setReviewCount: (state,action) =>{
            state.reviewCount += action.payload
        },
        setLogin: (state) =>{
            state.login = true
        },
        setToken : (state,action)=>{
            state.token = action.payload
        },
        setMessages : (state,action)=>{
            state.messages = action.payload
        },
        setMessage : (state,action)=>{
            state.message = action.payload
        },
        setErrors : (state,action)=>{
            state.errors = action.payload
        },
        setId : (state,action)=>{
            state.navId = action.payload
        }
    },
});


export const getOrders = () => async (dispatch) => {
    try {
        
        const response = await axios.get(`https://watch-ecommerce-app.azurewebsites.net/api/Orders/all`, {
            headers: {
                Authorization: `Bearer ${initialState.token}`,
            },
        })

        dispatch(setOrder(response.data))
    }
    catch (error) { }
}

export const getDashOrders = () => async (dispatch) => {
    try {
        
        const response = await axios.get(`https://watch-ecommerce-app.azurewebsites.net/api/Orders/dash-all`    )

        dispatch(setOrder(response.data))
    }
    catch (error) { }
}

export const getMessages = () => async (dispatch) => {
    try {
     const response =   await axios.get(`https://watch-ecommerce-app.azurewebsites.net/api/Contacts/all`)
        dispatch(setMessages(response.data))
    }
    catch (error) { console.log(error.response.data)}
}

export const getMessage = (id) => async (dispatch) => {
    try {
     const response =   await axios.get(`https://watch-ecommerce-app.azurewebsites.net/api/Contacts/${id}`)
        dispatch(setMessage(response.data))
    }
    catch (error) { console.log(error.response.data)}
}

export const responseMessage = (data) => async (dispatch) => {
    try {
      await axios.post(`https://watch-ecommerce-app.azurewebsites.net/api/Contacts/response`,data)
                .then(res=>    toast.success('Message send succesfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    }) )    
    }
    catch (error) { console.log(error.response.data)}
}




export const {setReviewCount, setOrder ,setLogin,setToken ,setMessages,setId,setMessage ,setErrors} = fetchSlice.actions
export default fetchSlice.reducer