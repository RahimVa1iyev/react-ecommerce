// basketSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    count: 0,
    loading: false,
    product : null,

};

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        setCount: (state, action) => {
            state.count = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setProduct: (state,action) => {
            state.product = action.payload;
        }
    },
});

export const getBasketItems = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const token = localStorage.getItem('authToken'); 
        const response = await axios.get(`https://api-project-ecommerce.azurewebsites.net/api/Shops/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch(setCount(response.data.items.length));
        dispatch(setProduct(response.data));
    } catch (error) {
    } finally {
        dispatch(setLoading(false));
    }
};

export const { setCount, setLoading,setProduct } = basketSlice.actions;
export default basketSlice.reducer;