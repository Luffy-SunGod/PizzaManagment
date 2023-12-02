import mongoose,{Schema} from "mongoose";
import { User } from "./user.model.js";


const orderSchema=new Schema({
    Pizza_Type:{
        type:String,
        required:true
    },
    description:{
        type:String,

    },
    price:{
        type:Number,
        required:true

    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    },
    adress:{
        type:String,
        required:true
    }
},{timestamps:true})

const Order=mongoose.model("Order",orderSchema);
export default Order;
