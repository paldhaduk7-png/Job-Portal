import {createSlice} from "@reduxjs/toolkit"



const jobSlice=createSlice({
    name:"job",
    initialState:{
        allJobs:[],
         
        singleJob:null,
        allAdminJobs: [],
        searchJobsByText: "",
        allAppliedJob:[],
        searchQuery: "",
        },
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs=action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob=action.payload;
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs=action.payload;
        },
        setSearchJobsByText:(state,action)=>{
            state.searchJobsByText=action.payload;
        },
        setAllAppliedJob:(state,action)=>{
            state.allAppliedJob=action.payload;
        },
        setSearchQuery:(state,action)=>{
            state.searchQuery=action.payload;
        },
  
        clearAllJobs:(state)=>{
            state.allJobs=[];
            state.singleJob=null;
            state.allAdminJobs=[];
            state.searchJobsByText="";
            state.allAppliedJob=[];
            state.searchQuery="";
        },
        
    }
});

export const {setAllJobs ,  setSingleJob , setAllAdminJobs, setSearchJobsByText , setAllAppliedJob , setSearchQuery, clearAllJobs}= jobSlice.actions;
export default jobSlice.reducer;