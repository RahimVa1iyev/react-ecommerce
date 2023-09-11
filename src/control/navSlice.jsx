import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedNav : '',
    selectedRoute :''
    
}

const navSlice = createSlice({
    name : "select",
    initialState,
    reducers : {
        setSelectedNav :(state,action)=>{
            state.selectedNav = action.payload
        },
        setSelectedRoute :(state,action)=>{
            state.selectedRoute = action.payload
        }

    }

})

export const {setSelectedRoute,setSelectedNav} = navSlice.actions
export default navSlice.reducer