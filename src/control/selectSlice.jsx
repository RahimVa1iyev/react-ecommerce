import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedValue : ""
}

const selectSlice = createSlice({
    name : "select",
    initialState,
    reducers : {
        setSelectedValue :(state,action)=>{
            state.selectedValue = action.payload
        }
    }

})

export const {setSelectedValue} = selectSlice.actions
export default selectSlice.reducer