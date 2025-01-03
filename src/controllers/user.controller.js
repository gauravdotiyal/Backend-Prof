import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"
 


const registerUser = asyncHandler(async (req, res) => {
  //get user details from fronend
  // validation check - not empty
  // check if username already exists - email , username
  // check for images check for avatars - multer
  // upload them on cloudinary , avatar - cloudinary
  // create user object  - create entry in db
  // remove password and refresh token from field response
  // check for user creation 
  // return response

   const {fullName,email,username,password}=req.body;
   console.log("Email ", email);

   if([fullName,email,username,password].some((field)=>field?.trim()==="")){
     throw new ApiError(400,"All Fields are required");
   }
   
   const existedUser=await User.findOne({
      $or:[{username},{email}]
   })
   if(existedUser){
    throw new ApiError(409,"User Already Exists");
   }

   console.log(req.files);

  const avatarLocalPath= req.files?.avatar[0]?.path;
  // const coverImageLocalPath=req.files?.coverImage[0].path;
  // separately checking for coverimage path existence 
  let coverImageLocalPath;
  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0)
  {
    coverImageLocalPath=req.files.coverImage[0].path;
  }
  if(!avatarLocalPath){
    throw new ApiError(400,"Avatar File path is required");
  }
  console.log(avatarLocalPath);

  const avatar=await uploadOnCloudinary(avatarLocalPath);
  const coverImage=await uploadOnCloudinary(coverImageLocalPath);
  console.log(avatar);
  console.log(coverImage);
 
  if(!avatar){
    throw new ApiError(400,"Avatar File is Required");
  }

  const user = await User.create({
     fullName,
     avatar:avatar.url,
     coverImage:coverImage?.url || "",
     email,
     password,
     username:username.toLowerCase(),
  })

  const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering the user");
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser,"User Registered Successfully ")
  )
 
}); 

export { registerUser };
