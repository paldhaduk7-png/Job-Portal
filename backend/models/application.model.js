import mongoose from "mongoose";


const applicationSchema=new mongoose.Schema({

    // Which job user applied to
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required:true
    },
    //Who applied
    applicant:{
         type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    status:{
        type:String,
        enum:['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
}, {timestamps: true});

export const Application=mongoose.model("Application", applicationSchema);