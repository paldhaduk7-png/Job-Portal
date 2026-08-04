import mongoose from "mongoose";

const forgotPasswordSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "10m",
    },
}, { timestamps: true });

export const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema);
