import { Company } from "../models/company.model.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/clodinary.js";
import mongoose from "mongoose";

//register company
export const registerCompany= async(req,res)=>{
try {
    const {companyName}=req.body;
    console.log(companyName);
            if(!companyName){
                return res.status(400).json({
                    message: "Please Enter a Company Name",
                success : false
                });
            }
 
            let company= await Company.findOne({name:companyName});
            //for use to find duplicate company name
            if(company){
                return res.status(400).json({
                    message: "You can't add same company",
                    success : false
                });
            }

    //here userid refernce from usercreating table by orderid
company =await Company.create({
    name: companyName,
    userId: req.id
});

return res.status(200).json({
    message: "Company register successfully",
    company,
    success: true
});

} catch (error) {
    console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
        success: false
    });
}
}



//get company
export const getCompany= async(req,res)=>{
    try {
        const userId=req.id;//logged in userid
//have aya je user je company create cari che te levani che mate userni id levi pade


const companies= await Company.find({userId});
       if(!companies){
         return res.status(404).json({
                    message: "You  companies not found",
                    success : false
            });
       }
    //   let companyArr=companies.split(",");   
       
       return res.status(200).json({
        company : companies,
        success:true
       })

    } catch (error) {
        console.log(error);
          return res.status(500).json({
        message: "Internal Server Error",
        success: false
    });
    }
}


//getcompany by id
export const getComapnyById= async (req,res)=>{

    try {
        const companyId=req.params.id;
        const  company =await Company.findById(companyId);
        if(!company){
         return res.status(404).json({
                    message: "You  companies not found",
                    success : false
            });
       }

       return res.status(200).json({
        company,
        success:true
       });


    } catch (error) {
        console.log(error);
          return res.status(500).json({
        message: "Internal Server Error",
        success: false
    });
    }
}

//update company
 export const updateCompany =async (req,res)=>{

    try {
        const {name, description, website ,location}=req.body;
        // multer may provide single file as `req.file` (for .single)
        // or as `req.files` when using .fields(). Support both.
        let file = req.file;
        if (!file && req.files && req.files.file && req.files.file.length > 0) {
          file = req.files.file[0];
        }
        //under cloundanry
          let logo;

    // only run when file exists
    if (file) {

      const fileUri = getDataUri(file);

      const cloudResponse = await cloudinary.uploader.upload(
        fileUri.content,
        {
          resource_type: "image"
        }
      );

      logo = cloudResponse.secure_url;
    }


       const updateData = {};

if (name) {
  updateData.name = name;
}

if (description) {
  updateData.description = description;
}

if (website) {
  updateData.website = website;
}

if (location) {
  updateData.location = location;
}
if (logo) {
  updateData.logo = logo;
}

        const company =await Company.findByIdAndUpdate(req.params.id , updateData, {new: true});
             if(!company){
                return res.status(404).json({
                    message: "company not found",
                    success : false
                });
             }
        
         return res.status(200).json({
        message: "company information is updated",
        company,
        success:true
       });

    } catch (error) {
        console.log(error);
          return res.status(500).json({
        message: "Internal Server Error",
        success: false
    });
    }
 }


 //delte compmny
 export const DeletCompny=async (req,res)=>{
  
  try {
    const { id } = req.params;

    const deletedCompany = await Company.findByIdAndDelete(id);

    if (!deletedCompany) {
      return res.status(404).json({
        message: "Company is Not Found!!!",
        success: false
      });
    }

    return res.status(200).json({
      message: "Company deleted successfully.",
      success: true
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
 }