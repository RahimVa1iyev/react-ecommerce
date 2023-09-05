import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const initialState = {
    orders: [],
    login : false,
    token :localStorage.getItem('authToken')
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





export const { setOrder ,setLogin,setToken  } = fetchSlice.actions
export default fetchSlice.reducer