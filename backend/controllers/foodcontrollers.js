import { log } from "console";
import foodModel from "../models/foodModel.js";
import fs from 'fs'
import { cloudinary } from "../config/cloudinary.js";


    //add food item 
 const addfood = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: "Image is required" });
    }

    // When using Cloudinary, req.file.path contains the secure URL
    const Image_url = req.file.path;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      Image: Image_url,
      category: req.body.category,
    });

    await food.save();

    res.json({ success: true, message: "food added" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

    //all food list
    const listfood = async (req,res) =>  {
try {
       const foods = await foodModel.find({});
       res.json({success:true,data:foods})
} catch (error) {
    console.log(error);
    res.json({success:false,Message:"error"})
    
}


    } 
  //remove food function
  const removefood = async(req,res) => {

try {
      const food = await foodModel.findById(req.body.id);
      
      // Check if it's a Cloudinary image or local image
      if (food.Image && food.Image.includes("cloudinary.com")) {
        // Extract public ID from URL to delete from Cloudinary
        // Logic: everything between last '/' and following '.' unless you use a more robust way
        const publicId = food.Image.split('/').pop().split('.')[0];
        const folderName = food.Image.split('/').slice(-2)[0]; // e.g. food_fiesta
        await cloudinary.uploader.destroy(`${folderName}/${publicId}`);
      } else {
        fs.unlink(`uploads/${food.Image}`,()=>{});
      }

      await foodModel.findByIdAndDelete(req.body.id);
      res.json({success:true, message:"food removed"})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
}

  }


     export {addfood,listfood,removefood}