import { createSlice } from "@reduxjs/toolkit";

let jobStored = JSON.parse(localStorage.getItem('jobList'));
let initialState = {
    jobApplied: jobStored ? jobStored : []
};

let jobSlice = createSlice({
    name: 'jobSlice',
    initialState,
    reducers: {
        applyJob: (state, action) => {
           jobStored.push(action.payload);
            state.jobApplied = jobStored;
            localStorage.setItem('jobList', JSON.stringify(state.jobApplied)); // Correctly store updated state
        }
    }
});

export const { applyJob } = jobSlice.actions;
export default jobSlice.reducer;
