import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './control/modalSlice';
import dashboardReducer from './control/dashboardSlice';    
import selectReducer from './control/selectSlice';
import basketReducer from './control/basketSlice';



export const store =configureStore({
    reducer : {
       modal : modalReducer,
       table : dashboardReducer,
       select: selectReducer,
       basket : basketReducer
    },
});