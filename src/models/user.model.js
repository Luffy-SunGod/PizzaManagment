import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import { createTokenForUser } from "../utils/authentication.js";
import { orderSchema } from "./order.model.js";
// const orderSchema=new Schema({
//     orderId:{

//     }
// })


const userSchema=new Schema({
    Name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    adress:{
        type:String,
        lowercase:true,
        required:true
    },
    token:{
        type:String
    },
    orders:{
        type:[orderSchema],
        ref:'Order',
        default:[]
    }

},{timestamps:true});

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password=await bcrypt.hash(this.password,10);
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.createToken=async function(){
    const user={
        _id:this._id,
        Name:this.Name,
        email:this.email
    }

    return createTokenForUser(user);
}


export const User=mongoose.model("User",userSchema);



