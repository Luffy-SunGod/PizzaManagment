import Pizza from "../models/pizza.model.js";

const handleGetPizza=async (req,res)=>{
    const data=await Pizza.find({});
    if(data)res.status(200).json({data:data});
    res.send(403).json({msg:"can't get pizzas"})
}

export {handleGetPizza}