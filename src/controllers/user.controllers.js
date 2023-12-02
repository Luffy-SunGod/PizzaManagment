import { User } from "../models/user.model.js";
const handleSingin=async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user)res.status(400).json({msg:"user doesn't exist plzz login"});
        const flag=await user.isPasswordCorrect(password);
        if(!flag)res.status(401).json({msg:"password incorrect try again!!"});
        const token=await user.createToken();
        await User.updateOne({_id:user._id},{$set:{token:token}})
        res.cookie("token",token).json({msg:"success"})
    }catch(error){ 
        console.log(error);
        res.status(400).json({
            msg:"error",
            error:"incorrrect credentails"
        })
    }
}

const handleSignup=async(req,res)=>{
    // console.log("req body: ",req.body)
    try {
        const {Name,email,password,adress}=req.body
        const user=User.create({
            Name,email,password,adress
        })
        return res.status(200).json({
            msg:"success",
        })
        
    } catch (error) {
        console.log("error: ",error);
        res.status(402).json({msg:"Plzz give all data",error});
    }
}


// const orderPizza=async((req,res,next)=>{

// })

export {handleSingin,handleSignup}


