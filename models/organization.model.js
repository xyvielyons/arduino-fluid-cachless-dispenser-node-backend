import mongoose from "mongoose";
const OrganizationSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    clerkId:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model('organization',OrganizationSchema)