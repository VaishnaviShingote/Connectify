//import { required } from "joi";
import mongoose from "mongoose";
import {genSalt,hash} from "bcrypt";


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    firstName: {
        type: String, 
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    image: { //image can be uplaoded using multer package
        type: String,
        required: false,
    },
    color: {
        type: Number, //not best practice
        required: false,
    },
    profileSetup:{ 
        type:Boolean,
        default: false,
    },
});

userSchema.pre("save",async function(next){ //cant use arrow func as we are using this keyword
    const salt= await genSalt();
    this.password= await hash(this.password, salt);
    next();
});

const User = mongoose.model("Users",userSchema);

export default User;