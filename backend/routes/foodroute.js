import express from "express";
import { addfood,listfood,removefood } from "../controllers/foodcontrollers.js";
import multer from "multer";
import authMiddleware from "../middleware/auth.js";

const foodRouter = express.Router();


// I mage storage Engine

import { storage } from "../config/cloudinary.js";
const upload = multer({storage:storage})

foodRouter.post("/add",    authMiddleware, upload.single("Image"), addfood);
foodRouter.get("/list",   listfood);
foodRouter.post("/remove", authMiddleware, removefood);


export default foodRouter;
