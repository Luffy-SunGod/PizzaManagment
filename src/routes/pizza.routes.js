import { Router } from "express"
import { handleGetPizza } from "../controllers/pizza.controllers.js";

const router=Router();

router.get("/AllPizza",handleGetPizza);

export default router;