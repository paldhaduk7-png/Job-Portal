import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
fullname:{
    type: String,
    required: true
},
email:{
    type: String,
    required: true,
    unique: true
},
phoneNumber:{
    type: Number,
    required: true,
    unique: true
},
password:{
    type: String,
    required: true
},
role:{
    type: String,
    enum: ['student', 'recruiter'],
      required: true
},
resetOTP: {
    type: String,
    default: null,
},
resetOTPExpire: {
    type: Date,
    default: null,
},
profile: {
  // Common
  bio: { type: String },
  profilePhoto: {
    type: String,
    default: ""
  },

  // Student
  skills: [{ type: String }],
  resume: { type: String },
  resumeOriginalName: { type: String },
    
    location: {
        type: String,
        default: ""
    },
    github: {
        type: String,
        default: ""
    },
    linkedin: {
        type: String,
        default: ""
    },
    portfolio: {
        type: String,
        default: ""
    },
    leetcode: {
        type: String,
        default: ""
    },

  // Recruiter
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
  },
  companyName: { type: String },
  designation: { type: String },
  companyLocation: { type: String },
  companyWebsite: { type: String }
}

} ,{timestamps: true});

export const User=mongoose.model('User', userSchema);