import {Order} from "../models/order.model.js"
import { User } from "../models/user.model.js";


const handlePlaceOrders=async(req,res)=>{
    const token=req.cookies.token;
    const new_order=req.body;
    try{
        const data=await User.find({token:token}).populate('orders');
        for(let o of new_order)data.orders.push(o);
        await data.save()
        res.status(200).json({msg:"order successful",data:data.orders})
    }catch (error) {
        console.log(error);
        res.status(403).json({msg:"error in taking order"})
    }
}

const handleGetOrders=async(req,res)=>{
    try {
        const token=req.cookies.token;
        const user = await User.findOne({ token }).populate('orders');
        if(!user)res.status(405).json({msg:"Plzz login first to get orders"});
        const data=user.orders;
        console.log(data);
        res.status(200).json({msg:"success1",data:data});
    } catch(error){
        console.log(error);
        res.status(405).json({msg:"invalid user"})
    }
}

const handleGetOrderById=async(req,res)=>{
    try {
        
        const token=req.cookies.token;
        const orderId = req.params.orderId;  

        const data=await User.find({token:token});
        if(!data)res.status(405).json({msg:"Plzz login first to get orders"});
        const orders=data.orders;
        
        if(!order)res.status(400).json({msg:"order doesnt exist"})
        res.status(200).json({msg:"success",data:order});
    } catch (error) {
        console.log(error);
        res.status(405).json({msg:"invalid request"})
        
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
    const data=await Order.findByIdAndUpdate({_id:id},{$set:{
        Pizza_Type:order.Pizza_Type,
        adress:order.adress,
        quantity:order.quantity,
        status:order.status
    }})
    if(!data){
        res.status(403).json({msg:"not able to update order"})
    }
    res.status(201).json({msg:"order updated sucessfully!!",order:data});
}

const deleteOrder=async(req,res)=>{
    const id = req.params.id;
    const data=await Order.findByIdAndDelete(id)
    // console.log(data);  
    if(!data){
        res.status(403).json({msg:"not able to delete order"})
    }
    res.status(201).json({msg:"order canceled sucessfully!!",order:data});
}
export {handlePlaceOrders,handleGetOrders,handleGetOrderById,deleteOrder,updateOrder}

