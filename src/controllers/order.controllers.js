import {Order} from "../models/order.model.js"
import { User } from "../models/user.model.js";


const handlePlaceOrders=async(req,res)=>{
    const token=req.cookies.token;
    const new_order=req.body;
    try{
        const orders=await Order.insertMany(new_order);
        const data=await User.find({token:token});
        data[0].orders=[];

        for(let o of orders){
            data[0].orders.push(o._id);     
        }
        
        const result=await User.findOneAndUpdate({token},{$set:{
            orders:data[0].orders,
        }})
        
        res.status(200).json({msg:"order successful",data:result.orders})
    }catch (error) {
        console.log(error);
        res.status(403).json({msg:"error in taking order"})
    }
}

const handleGetOrders=async(req,res)=>{
    try {
        const token=req.cookies.token;
        const data=await User.findOne({ token }).populate('orders');
        res.status(200).json({msg:"success1",data:data.orders});
    }catch(error){
        console.log(error);
        res.status(405).json({msg:"invalid user",})
    }
}

const handleGetOrderById=async(req,res)=>{
    try {
        const id=req.params.orderId;
        const token=req.cookies.token;
        const data=await User.findOne({ token }).populate('orders');
        const result=data.orders.filter((o1)=>(o1._id.toString()===id))
        res.status(200).json({msg:"success",data:result});
    } catch (error) {
        console.log(error);
        res.status(405).json({msg:"invalid request"})
        
    }
}

const updateOrder=async(req,res)=>{
    const id=req.params.orderId;
    try {
        const data=await Order.findById(id);
        console.log(data);
        const result =await Order.findByIdAndUpdate(id,{$set:{
            adress:data.adress||req.body.adress,
            Pizza_Type:data.Pizza_Type||req.body.Pizza_Type,
            quantity:data.quantity||req.body.quantity
        }})
        res.status(201).json({msg:"order updated sucessfully!!",data:result});
    } catch (error) {
        console.log(error);
        res.status(403).json({msg:"not able to update order",});
    }
    
}
const deleteOrder=async(req,res)=>{
    const token=req.cookies.token;
    const id=req.params.orderId;
    try {
        const data=await User.findOne({ token }).populate('orders');
        const new_order=data.orders.map((o1)=>{
            if(o1._id.toString()===id)return            
            else return o1;
        })
        const result=await User.findOneAndUpdate({token},{$set:{
            orders:new_order,
        }})
        res.status(201).json({msg:"order canceled sucessfully!!",order:result});
    } catch (error) {
        console.log(error);
        res.status(403).json({msg:"not able to delete order"})
    }
}
export {handlePlaceOrders,handleGetOrders,handleGetOrderById,deleteOrder,updateOrder}

