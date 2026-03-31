import express from "express";
import { addfood,listfood,removefood } from "../controllers/foodcontrollers.js";
import multer from "multer";

const foodRouter = express.Router();


// I mage storage Engine

import { storage } from "../config/cloudinary.js";
const upload = multer({storage:storage})

foodRouter.post("/add", upload.single("Image"), addfood);

foodRouter.get("/list",listfood)  
foodRouter.post("/remove",removefood)


export default foodRouter;
