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
        filters: {
            location: "",
            industry: "",
            salary: ""
        }
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
        setLocationFilter: (state, action) => {
            if (!state.filters) state.filters = { location: "", industry: "", salary: "" };
            state.filters.location = action.payload;
        },
        setIndustryFilter: (state, action) => {
            if (!state.filters) state.filters = { location: "", industry: "", salary: "" };
            state.filters.industry = action.payload;
        },
        setSalaryFilter: (state, action) => {
            if (!state.filters) state.filters = { location: "", industry: "", salary: "" };
            state.filters.salary = action.payload;
        },
        clearFilters: (state) => {
            state.filters = {
                location: "",
                industry: "",
                salary: "",
            };
        },
        clearAllJobs:(state)=>{
            state.allJobs=[];
            state.singleJob=null;
            state.allAdminJobs=[];
            state.searchJobsByText="";
            state.allAppliedJob=[];
            state.searchQuery="";
            state.filters = {
                location: "",
                industry: "",
                salary: "",
            };
        },
    }
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobsByText,
    setAllAppliedJob,
    setSearchQuery,
    clearAllJobs,
    setLocationFilter,
    setIndustryFilter,
    setSalaryFilter,
    clearFilters
} = jobSlice.actions;

export default jobSlice.reducer;