import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//for register
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
   console.log("BODY:", req.body);

    //eny filed not are empty
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    //check donot use duplicate email
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    //pasword convert into hash
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "Account create successfully",
      success: true,
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
  }
};




//for Login
export const Login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
console.log(email, password, role);

    //eny filed not are empty
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is Missing",
        success: false,
      });
    }

    //cheak email exist
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email ",
        success: false,
      });
    }

    //check password exist
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }

    //check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role",
        success: false,
      });
    }

    //now genarate token for user
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      Profile: user.profile,
    };

    //store token in cookie
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};


//Logout
export const logout = async (req, res) => {
  try {
    //expier from cookie
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};


//update profile
export const updateProfile= async (req,res)=>{
    try {
       const {fullname,email,phoneNumber,bio,skills} =req.body;
   const file=req.file;
    //cloudinary avase (for file)

    let skillsArray;
    if(skills){
  skillsArray=skills.split(",");
    }
   
    const userId=req.id;  //middlware authetication
    let user= await User.findById(userId);
           if(!user){
             return res.status(400).json({
                message:"User not found",
                success:false
             });
           }

           //updating data
           if(fullname)      user.fullname=fullname;
           if(email)         user.email=email;
           if(phoneNumber)    user.phoneNumber=phoneNumber;
           if(bio)           user.profile.bio=bio;
           if(skills)    user.profile.skills=skillsArray;
      
       
      //resume comes later here...
      await user.save();

       user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      Profile: user.profile,
    };

     return res.status(200).json({
        message : "Profile Upadated Succesfuuly",
        user,
        success:true
     })

    } catch (error) {
        console.log(error);
    }
}
