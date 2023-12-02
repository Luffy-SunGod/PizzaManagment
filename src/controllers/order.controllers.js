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

const handleGetOrderById=async(req,res)=>{
    try {
        
        const id = req.params.id;
        const order=await Order.findById({_id:id});
        if(!order)res.status(400).json({msg:"order doesnt exist"})
        res.status(200).json({msg:"success",data:order});
    } catch (error) {
        console.log(error);
        res.json({msg:"invalid request"})
        
    }
}

const updateOrder=async(req,res)=>{
    const id = req.params.id;
    const order=await Order.findById({_id:id});
    if(!order)res.status(400).json({msg:"order doesnt exist"})
    order.Pizza_Type=req.body.Pizza_Type||order.Pizza_Type;
    order.adress=req.body.adress||order.adress;
    order.quantity=req.body.quantity||order.quantity;
    order.status=req.body.status||order.status;
    await Order.findByIdAndUpdate({_id:id},{$set:{
        Pizza_Type:order.Pizza_Type,
        adress:order.adress,
        quantity:order.quantity,
        status:order.status
    }})
}

const deleteOrder=async(req,res)=>{
    const id = req.params.id;
    await Order.findByIdAndDelete({_id:id})
    .then(()=>{
        res.status(201).json({msg:"order canceled successfully"});
    })
    .catch((error)=>{
        res.status(402).json({msg:"flase",error:error});
    });
}
export {handlePlaceOrders,handleGetOrders,handleGetOrderById,deleteOrder,updateOrder}

