import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

const checkForAuthentication=((req,res,next)=>{
    if(req.cookies.token){
        let currentTokenValue=jwt.verify(req.cookies.token,process.env.TOKEN_SALT);
        let token=User.find({currentTokenValue});
        if(token){
            next();
        }else {
            return res.json({msg:"user not verified"})
        }
    }else{
        res.json({msg:"operation not allowed"})
    }
})

export {checkForAuthentication};
