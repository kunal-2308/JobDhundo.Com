import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    loading:false,
}
const userAuthSlice = createSlice({
    name:'authSlice',
    initialState,
    reducers:{
        setLoading : (state,action)=>{
            state.loading = action.payload;
        }
    }
});

export const {setLoading} = userAuthSlice.actions;
export default userAuthSlice.reducer;