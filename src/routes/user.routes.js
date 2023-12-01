import { Router } from "express";
import { handleSingin,handleSignup } from "../controllers/user.controllers.js";

const router=Router();

router.post("/signin",handleSingin);

router.post("/signup",handleSignup);

export default router;
