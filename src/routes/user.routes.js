import { Router } from "express";
import { handleSingin,handleSignup } from "../controllers/user.controllers.js";
import { body} from "express-validator";

const router=Router();

router.post("/signin",[
        body('email','Invalid email!').isEmail(),
        body('password','Password length should be >=5!!').isLength({min:5})
],handleSingin); 
 
router.post("/signup",[
    body('Name','Name should be of length 3 atleast!').isLength({min:3}),
    body('email','Invalid email !').isEmail(),
    body('password','Password length should be >=5!!').isLength({min:5}),
    body('adress','enter correct adress').isLength({min:5})  
],handleSignup);

export default router;
