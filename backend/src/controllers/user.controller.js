import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { User } from "../models/user.models.js";

const generateAccessAndRefreshToken = async(userId) => {
    try {
       const user = await User.findById(userId)
       //console.log(user);
       const accessToken = user.generateAccessToken()
       //console.log(accessToken);
       const refreshToken = user.generateRefreshToken()
       user.refreshToken = refreshToken
       await user.save({validateBeforeSave: false})
       return {accessToken , refreshToken}
    }
     catch (error) {
       throw new ApiError(500,"Something went wrong while generating refresh and access tokens")   
    }
    }


const registerUser = asyncHandler(async(req,res)=>{

    const {username, fullname, email, password, dateOfBirth, gender}=req.body
    console.log(req.body);
    
    if(
        [fullname, email, username, password].some((field)=>
        field?.trim() === "")
       ){
        throw new ApiError(400,"All fields are required")
       }

    //User exist or not
   const existedUser= await User.findOne({
    $or: [{ username },{ email }]
   })
   if(existedUser){
    throw new ApiError(409,"User with email or username already exists")
   }
   console.log(existedUser);
   
   //ProfilePic
   
   const  picLocalPath = req.file?.path 
//    if(!req.file?.path){
//     picLocalPath = "https://res.cloudinary.com/derjvj7ok/image/upload/v1734515920/jsf57h3ny0ccyhmvskcs.png"
//    }
    const profilePic = await uploadOnCloudinary(picLocalPath)

   const user = await User.create({
    fullname: (fullname? fullname: ""),
    username: (username? username:""),
    email,
    password,
    gender:gender || "",
    profilePic: {
        url: profilePic?.url || "",
        cloudinary_public_id: profilePic?.public_id || ""
    },
    dateOfBirth: dateOfBirth ? dateOfBirth: ""
   })

   console.log(user);
   
   const createdUser = await User.findOne(user._id).select(
    "-password -refreshToken"
   )
   
   if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering the user")
    }

    return res.status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"))


})

const loginUser = asyncHandler(async(req,res)=>{
    const {username, email, password}=req.body
    console.log(req.body);
    
    if(!(username || email)){
        throw new ApiError(400,"username or email is required")
      }

    const user = await User.findOne({
        $or: [{username},{email}]
    })

    if(!user){
        throw new ApiError(404,"User does not exist")
      }
    
    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(404,"Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findOne(user._Id).select(
   "-password -refreshToken"
    )

    const options={
        httpOnly: true,
        secure: true
     }

     return res
     .status(200)
     .cookie("accessToken",accessToken,options) //We can access cookie here because of cookieParser
     .cookie("refreshToken",refreshToken,options)
     .json(
        new ApiResponse(
           200,
           {
              user: loggedInUser, accessToken, refreshToken
           },
           "User logged In Successfully"
        )
     )
    
})


export {
    registerUser,
    loginUser
}