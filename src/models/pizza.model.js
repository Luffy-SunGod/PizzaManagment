import mongoose,{ Schema } from "mongoose";

const pizzaSchema=new Schema({
    typeOf:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true 
    },
    category:{
        type:String,
        enum:["Veg","NON-VEG"],
        default:"VEG",
    },
    sizeAvail:{
        type:String,
        enum:["SMALL","MEDIUM","LARGE"],
        default:"SMALL",
    }

},{timestamps:true}) 

const Pizza=mongoose.model("Pizza",pizzaSchema);
export default Pizza; 

