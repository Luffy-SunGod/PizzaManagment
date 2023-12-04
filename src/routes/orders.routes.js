import {Router} from "express"
import { handlePlaceOrders ,handleGetOrders,handleGetOrderById,deleteOrder,updateOrder} from "../controllers/order.controllers.js";

const router=Router();

router.post("/orders",handlePlaceOrders)
router.get("/orders",handleGetOrders)
router.get("/orders/:orderId",handleGetOrderById)
router.put("/orders/:orderId",updateOrder)
router.delete("/orders/:orderId",deleteOrder);

export default router;