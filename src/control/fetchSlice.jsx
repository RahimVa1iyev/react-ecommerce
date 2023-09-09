import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const initialState = {
    token :localStorage.getItem('authToken'),
    orders: [],
    login : false,
    messages : [],
    message: '',
    errors : [],
    navId:1
};


const fetchSlice = createSlice({
    name: "fetch",
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.orders = action.payload;
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
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`https://localhost:7039/api/Orders/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        dispatch(setOrder(response.data))
    }
    catch (error) { }
}

export const getMessages = () => async (dispatch) => {
    try {
     const response =   await axios.get(`https://localhost:7039/api/Contacts/all`)
        dispatch(setMessages(response.data))
    }
    catch (error) { console.log(error.response.data)}
}

export const getMessage = (id) => async (dispatch) => {
    try {
     const response =   await axios.get(`https://localhost:7039/api/Contacts/${id}`)
        dispatch(setMessage(response.data))
    }
    catch (error) { console.log(error.response.data)}
}

export const responseMessage = (data) => async (dispatch) => {
    try {
      await axios.post(`https://localhost:7039/api/Contacts/response`,data)
                .then(res=> {console.log("Message send succesfuly") ; } )    
    }
    catch (error) { console.log(error.response.data)}
}




export const { setOrder ,setLogin,setToken ,setMessages,setId,setMessage ,setErrors} = fetchSlice.actions
export default fetchSlice.reducer