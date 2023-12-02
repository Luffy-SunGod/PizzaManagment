import {Router} from "express"
import { handlePlaceOrders ,handleGetOrders} from "../controllers/order.controllers.js";

const router=Router();

router.post("/orders",handlePlaceOrders)
router.get("/orders",handleGetOrders)

export default router;