import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



const initialState = {
    orders: [],
};


const fetchSlice = createSlice({
    name: "fetch",
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.orders = action.payload;
        },
       
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



export const { setOrder  } = fetchSlice.actions
export default fetchSlice.reducer