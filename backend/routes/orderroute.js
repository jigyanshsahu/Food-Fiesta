import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder, verifyorder, userOrders,listorders,updateStatus } from "../controllers/ordercontroller.js"

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyorder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", authMiddleware, listorders);
orderRouter.post("/status", authMiddleware, updateStatus);

export default orderRouter;
