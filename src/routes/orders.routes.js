import {Router} from "express"
import { handlePlaceOrders ,handleGetOrders,handleGetOrderById,deleteOrder,updateOrder} from "../controllers/order.controllers.js";

const router=Router();

router.post("/orders",handlePlaceOrders)
router.get("/orders",handleGetOrders)
router.get("/orders/:id",handleGetOrderById)
router.put("/orders:id",updateOrder)
router.delete("/order:id",deleteOrder);

export default router;