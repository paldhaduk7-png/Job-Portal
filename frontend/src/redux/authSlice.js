import { createSlice } from "@reduxjs/toolkit";



const authSlice=createSlice({
    name: "auth",
    initialState:{
       loading: false,
       user:null,
       resetEmail: "",
       resetOtp: "",
    },
    reducers:{
        //action
        setLoading:(state,action)=>{
           state.loading=action.payload;
        },
        setUser:(state,action)=>{
           state.user=action.payload;
        },
        setResetEmail:(state,action)=>{
           state.resetEmail=action.payload;
        },
        setResetOtp:(state,action)=>{
           state.resetOtp=action.payload;
        },
        clearResetData:(state)=>{
           state.resetEmail="";
           state.resetOtp="";
        }
     }
});

export const {setLoading, setUser, setResetEmail, setResetOtp, clearResetData} = authSlice.actions;
export default authSlice.reducer;