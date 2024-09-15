import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    loading:false,
}
const userAuthLoadingSlice = createSlice({
    name:'loadingSlice',
    initialState,
    reducers:{
        setLoading : (state,action)=>{
            state.loading = action.payload;
        }
    }
});

export const {setLoading} = userAuthLoadingSlice.actions;
export default userAuthLoadingSlice.reducer;