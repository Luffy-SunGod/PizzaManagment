import Order from "../models/order.model.js"
import { User } from "../models/user.model.js";

const handlePlaceOrders=async(req,res)=>{
    const orders=req.body;
    try {
        const userOrder=await Order.insertMany(orders)
        if(!userOrder)res.json({msg:"invalid order data !!"})
        res.status(201).json({msg:"order successful"})
    }catch (error) {
        console.log(error);
        res.json({msg:"error in taking order"})
    }
}

const handleGetOrders=async(req,res)=>{
    try {
        const token=req.cookies.token;
        const user=await User.find({token});
        if(!user)res.status(405).json({msg:"Plzz login first to get orders"});
        const data=await Order.find({userId:user._id})
        if(!data)res.json({msg:"user don't exist"})
        res.send({msg:"success",data:data});
    } catch (error){
        console.log(error);
        res.send({msg:"invalid user"})
    }
}


export {handlePlaceOrders,handleGetOrders}

