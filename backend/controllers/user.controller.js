import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/clodinary.js";


//for register
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
   console.log("BODY:", req.body);

    //eny filed not are empty
    if (!fullname || !email || !phoneNumber || !password ||  !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    //implet cloudary for image
   const file = req.files?.profilePhoto?.[0];

     let cloudResponse;
    if(file){
      const fileUri=getDataUri(file);
   cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
  resource_type: "image"
});

    }


    //check donot use duplicate email (convert to lowercase for consistency)
    let user = await User.findOne({ email: email.toLowerCase() });
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
      email: email.toLowerCase(),
      phoneNumber,
      password: hashedPassword,
      role,
      profile:{
        profilePhoto: cloudResponse?.secure_url || "",
      }
    });

    return res.status(201).json({
      message: "Account create successfully",
      success: true,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
        message: error.message || "Something went wrong during registration",
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
    let user = await User.findOne({email  :email.toLowerCase() });
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
    return res.status(500).json({
      message: "Login failed",
      success: false
    });
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
       const {fullname,email,phoneNumber,bio,skills,location,github,linkedin,portfolio,leetcode} =req.body;

  const profilePhoto = req.files?.profilePhoto?.[0];
const resume = req.files?.resume?.[0];

let profilePhotoResponse;
let resumeResponse;
    //cloudinary avase (for file)


    if(profilePhoto){
    //datauri.js ma file mokali
    // console.log("FILE:", file);
 const fileUri= getDataUri(profilePhoto);

 //cloudnary.js mathi responce avse
profilePhotoResponse = await cloudinary.uploader.upload(fileUri.content, {
 resource_type: "image"
});
console.log("RESUME CLOUDINARY:", resumeResponse);
    }

    if (resume) {
  const fileUri = getDataUri(resume);

  resumeResponse = await cloudinary.uploader.upload(fileUri.content, {
    resource_type: "image",
    format: "pdf",
    use_filename: true,
    unique_filename: true
  });

  console.log("RESUME CLOUDINARY:", resumeResponse);
}

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


if (email) {
  const existingUser = await User.findOne({ email });

  if (existingUser && existingUser._id.toString() !== userId) {
    return res.status(400).json({
      message: "Email already exists",
      success: false
    });
  }

  user.email = email;
}

           //updating data
           if(fullname)      user.fullname=fullname;
           if(phoneNumber)    user.phoneNumber=phoneNumber;
           if(bio)           user.profile.bio=bio;
        if (location !== undefined) user.profile.location = location;
if (github !== undefined) user.profile.github = github;
if (linkedin !== undefined) user.profile.linkedin = linkedin;
if (portfolio !== undefined) user.profile.portfolio = portfolio;
if (leetcode !== undefined) user.profile.leetcode = leetcode; 
       
if(profilePhotoResponse){
   user.profile.profilePhoto = profilePhotoResponse.secure_url;
}


      //resume comes later here...
  if(resumeResponse){
   user.profile.resume = resumeResponse.secure_url;
   user.profile.resumeOriginalName = resume.originalname;
}

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
        return res.status(500).json({
            message: "Profile update failed",
            success: false
        });
    }
}

export const updateRecruiterProfile= async (req,res)=>{
    try {
       const {fullname,email,phoneNumber,bio,companyName,designation,companyLocation,companyWebsite} =req.body;

  const profilePhoto = req.files?.profilePhoto?.[0];
let profilePhotoResponse;
    if(profilePhoto){
    //datauri.js ma file mokali
    // console.log("FILE:", file);
 const fileUri= getDataUri(profilePhoto);

 //cloudnary.js mathi responce avse
profilePhotoResponse = await cloudinary.uploader.upload(fileUri.content, {
 resource_type: "image"
});
    }

   
    const userId=req.id;  //middlware authetication
    let user= await User.findById(userId);
           if(!user){
             return res.status(400).json({
                message:"User not found",
                success:false
             });
           }


if (email) {
  const existingUser = await User.findOne({ email });

  if (existingUser && existingUser._id.toString() !== userId) {
    return res.status(400).json({
      message: "Email already exists",
      success: false
    });
  }

  user.email = email;
}

           //updating data
           if(fullname)      user.fullname=fullname;
           if(phoneNumber)    user.phoneNumber=phoneNumber;
           if(bio)           user.profile.bio=bio;
           if(companyName)           user.profile.companyName=companyName;
           if(designation)           user.profile.designation=designation;
           if(companyLocation)           user.profile.companyLocation=companyLocation;
           if(companyWebsite)           user.profile.companyWebsite=companyWebsite;
            
if(profilePhotoResponse){
   user.profile.profilePhoto = profilePhotoResponse.secure_url;
}
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
        return res.status(500).json({
            message: "Profile update failed",
            success: false
        });
    }
}
