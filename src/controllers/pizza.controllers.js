import Pizza from "../models/pizza.model.js";

const handleGetPizza=async (req,res)=>{
    const data=await Pizza.find({});
    res.json({data:data});
}

export {handleGetPizza}