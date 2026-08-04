import bcrypt from "bcryptjs";
import { ForgotPassword } from "../models/ForgotPassword.js";
import { User } from "../models/user.model.js";
import sendEmail from "../utils/sendEmail.js";

const OTP_TTL_MS = 10 * 60 * 1000;

export const forgotPassword = async (req, res) => {
    try {
        const email = req.body.email.trim().toLowerCase();

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
       console.log("otp is:", otp);
        // Remove old OTP if it exists
        await ForgotPassword.deleteOne({ email });

        // Save new OTP
        await ForgotPassword.create({
            email,
            otp,
        });

        await sendEmail(
            email,
            "Password Reset OTP",
            `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`
        );

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};



export const verifyOtp = async (req, res) => {
    try {
        const email = req.body.email.trim().toLowerCase();
        const { otp } = req.body;
const otpData = await ForgotPassword.findOne({
    email,
    otp: Number(otp),
});

        if (!otpData || Date.now() > otpData.createdAt.getTime() + OTP_TTL_MS) {
            return res.status(400).json({
                success: false,
                message: "OTP expired or invalid",
            });
        }

        return res.status(200).json({
            message: "OTP verified successfully",
            success: true,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};



export const resetPassword = async (req, res) => {
    try {
        const email = req.body.email.trim().toLowerCase();
        const { otp, password } = req.body;

        // Find OTP
      const otpData = await ForgotPassword.findOne({
    email,
    otp: Number(otp),
});

        if (!otpData || Date.now() > otpData.createdAt.getTime() + OTP_TTL_MS) {
            return res.status(400).json({
                success: false,
                message: "OTP expired or invalid",
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password
        user.password = hashedPassword;
        await user.save();

        // Delete OTP after successful reset
        await ForgotPassword.deleteOne({ email });

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};