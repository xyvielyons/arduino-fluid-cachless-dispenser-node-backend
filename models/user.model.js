import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    uid:{
        type:String,
        required:true
    },
    
    image:{
        type:String,
        default:"https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png",
    },
    
  

},{timestamps:true})

export default mongoose.model('user',UserSchema)