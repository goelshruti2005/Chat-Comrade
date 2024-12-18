import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME , 
    api_key: process.env.cLOUDINARY_API_KEY, 
    api_secret:  process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null; //if local file path not given then return null

        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })
        console.log("File is uploaded successfully");

        //Delete the file from memory
        fs.unlinkSync(localFilePath)
        return response;
        
    } catch (error) {
        console.log("File not uploaded, Please try again");
       //remove the locally saved temporary saved file as the upload operation got failed
        fs.unlinkSync(localFilePath)
        return null;
    }
}

const deleteFromCloudinary =async (cloudinaryFilePath) => {
    if(!cloudinaryFilePath) return null;

    //Delete file from cloudinary
    
}

export {
    uploadOnCloudinary,
    deleteFromCloudinary
}