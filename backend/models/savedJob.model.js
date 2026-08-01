import mongoose from "mongoose";

const saveSchema= new mongoose.Schema({

     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

},{timestamps: true});

export const Save=mongoose.model('Save', saveSchema)