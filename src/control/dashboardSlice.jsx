import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    Id : 0,
   
}

const dahboardSlice = createSlice ({
    name : "table",
    initialState,
    reducers : {
        setId : (state,action) =>{
            state.Id = action.payload;
        }
    }
})

export const {setId} = dahboardSlice.actions;
export default dahboardSlice.reducer