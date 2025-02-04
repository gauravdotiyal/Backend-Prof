import mongoose, {Schema} from "mongoose"

const likeSchema=new mongoose.Schema({
        username:{
             type:String,
             requiredL:true,  
        },

},{timestamps:true});

export const Like=mongoose.model("Like", likeSchema);