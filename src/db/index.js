import mongoose from "mongoose";
import DB_NAME from "../constant.js";

const connectDB=async()=>{
    try {
        const dbConnectInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("DB connected successfull :",dbConnectInstance.connection.host);
    }catch (error) {
        console.log("Error in connecting DB: ",error);
        throw error;
    }
}

export default connectDB;

