import {createSlice} from '@reduxjs/toolkit'

const initialState = {
movie ,
year

}

const movieSlice = createSlice({
    name: 'Movies',
    initialState,
    reducers:{
        addingDetails: (state, action)=>{
            state.movie = action.payload
           
        },
        addingYear:(state,action)=>{
            state.year = action.payload
        }
    }

})

export const {addingDetails,addingYear} = movieSlice.actions;

export default movieSlice.reducer;