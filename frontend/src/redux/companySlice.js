import { createSlice } from "@reduxjs/toolkit";



const companySlice=createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        allCompany: [],
        searchComapnyByText: ""
    },
    reducers:{
    setSingleCompany:(state,action)=>{
        state.singleCompany=action.payload
    },
    setAllCompany:(state,action)=>{
        state.allCompany=action.payload
    },
    setsearchComapnyByText:(state,action)=>{
        state.searchComapnyByText=action.payload
    }
    }
});

export const { setSingleCompany , setAllCompany, setsearchComapnyByText } = companySlice.actions;
export default companySlice.reducer;