import {Order} from "../models/order.model.js"
import { User } from "../models/user.model.js";


const handlePlaceOrders=async(req,res)=>{
    const token=req.cookies.token;
    const new_order=req.body;
    try{
        const orders=await Order.insertMany(new_order);
        const data=await User.find({token:token});
        console.log(data[0].orders)
        data[0].orders=[];

        for(let o of orders){
            data[0].orders.push(o._id);     
        }
        console.log(data[0].orders);
        
        const res=await User.findOneAndUpdate({token},{$set:{
            orders:data[0].orders,
        }})
        
        res.status(200).json({msg:"order successful",data:res})
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
        const id=""+req.params.orderId;
        console.log(id);
        const token=req.cookies.token;
        const data=await User.findOne({ token }).populate('orders');
        const result=data.orders.filter((o1)=>(o1._id.toString()===id))
            console.log(result);
        res.status(200).json({msg:"success",data:result});
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

