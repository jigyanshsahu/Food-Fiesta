import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  Image: { type: String, required: true },
  category: { type: String, required: true },
});

const Food = mongoose.models.food || mongoose.model("food", foodSchema);

const dishToImage = {
  // Pizza
  "Margherita Pizza": "margherita_pizza.png",
  "Pepperoni Pizza": "pepperoni_pizza.png",
  "Double Cheese Pizza": "1765285561149254056795-classic-margherita-pizzand.webp",
  "Veggies Pizza": "pizza_1.png",
  "Peri Peri Pizza": "pizza_1.png",
  
  // Pasta
  "Alfredo Pasta": "alfredo_pasta.png",
  "Arabiatta Pasta": "pasta_1.png",
  "Pink Sauce Pasta": "pasta_1.png",
  "Bolognese Pasta": "pasta_1.png",
  "Pesto Pasta": "pesto_pasta.png",
  
  // Burger
  "Zinger Burger": "zinger_burger.png",
  "Cheeseburger Burger": "1765285519096burger.webp",
  "Veggie Supreme Burger": "burger_1.png",
  "Signature Burger": "burger_1.png",
  "Double Patty Burger": "burger_1.png",
  
  // Salad
  "Classic Caesar Salad": "caesar_salad.png",
  "Greek Green Salad": "1765160519528HMONG-Potluck-Chopped-Salad.webp",
  "Spicy Chickpea Salad": "salad_1.png",
  "Protein Heavy Salad": "salad_1.png",
  "Summer Breeze Salad": "salad_1.png",
  
  // Vegetarian (Indian)
  "Butter Paneer Vegetarian": "1765285068660indian-food-saag-paneer-curry-dish-chopped-cilantro-43242328.webp",
  "Paneer Tikka Vegetarian": "1765286017415indian-food-1120x732.jpg",
  "Kadhai Paneer Vegetarian": "1765286346279dosa.webp",
  
  // Biryani
  "Hyderabadi Biryani": "hyderabadi_biryani.png",
  "Kolkata Style Biryani": "1765284931166Chicken-curry.webp",
  
  // Steaks
  "Prime Cut Steaks": "t_bone_steak.png",
  "T-Bone Special Steaks": "t_bone_steak.png",
  "Grilled Fillet Steaks": "1765284724472Air-Fryer-Salmon.webp",
  
  // Korean
  "Spicy Korean Korean": "1765286523550flat-lay-ramen-soup-bowl_23-2148368675.webp",
  "Jjajang style Korean": "jjajang_noodles.png",
  "Creamy Rose Korean": "1765284986168Chicken-pasta-bake.webp",
  
  // Stew
  "Traditional Beef Stew": "1765284885456Chicken-and-chorizo-.webp",
  "Hearty Pot Stew": "1765285430038Cottage-Pie.webp",
};

const categoryToDefaultImage = {
  "Pizza": "pizza_1.png",
  "Pasta": "pasta_1.png",
  "Burger": "burger_1.png",
  "Salad": "salad_1.png",
  "Vegetarian": "1765285068660indian-food-saag-paneer-curry-dish-chopped-cilantro-43242328.webp",
  "Biryani": "1765284931166Chicken-curry.webp",
  "Steaks": "1765284724472Air-Fryer-Salmon.webp",
  "Sides": "1765286126446butteer.webp",
  "Korean": "1765286523550flat-lay-ramen-soup-bowl_23-2148368675.webp",
  "Stew": "1765284885456Chicken-and-chorizo-.webp",
};

const categories = Object.keys(categoryToDefaultImage);

const seedData = [];

const dishNames = {
  "Pizza": ["Margherita", "Pepperoni", "Double Cheese", "Veggies", "Peri Peri"],
  "Pasta": ["Alfredo", "Arabiatta", "Pink Sauce", "Bolognese", "Pesto"],
  "Burger": ["Zinger", "Cheeseburger", "Veggie Supreme", "Signature", "Double Patty"],
  "Salad": ["Classic Caesar", "Greek Green", "Spicy Chickpea", "Protein Heavy", "Summer Breeze"],
  "Vegetarian": ["Butter Paneer", "Paneer Tikka", "Kadhai Paneer", "Shahi Paneer", "Tawa Paneer"],
  "Biryani": ["Hyderabadi", "Lucknowi", "Veg Dum", "Kolkata Style", "Egg Tikka"],
  "Steaks": ["Prime Cut", "T-Bone Special", "Grilled Fillet", "Pan Seared", "Butter-Basted"],
  "Sides": ["Standard Garlic", "Extra Cheesy", "Butter Brush", "Gourmet Naan", "Herb Infused"],
  "Korean": ["Spicy Korean", "Creamy Rose", "Jjajang style", "Golden Cheddar", "Mild White"],
  "Stew": ["Traditional Beef", "Slow Cooked", "Red Wine style", "Hearty Pot", "Gourmet Stew"],
};

for (const cat of categories) {
    const list = dishNames[cat] || ["Standard"];
    list.forEach((name, i) => {
        const fullName = `${name} ${cat}`;
        seedData.push({
            name: fullName,
            description: `A delicious and premium ${cat} prepared using fresh ingredients, traditional recipes, and authentic local spices for maximum flavor.`,
            price: (250 + (i * 20)).toString(),
            Image: dishToImage[fullName] || categoryToDefaultImage[cat],
            category: cat,
        });
    });
}

const seed = async () => {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected! Cleaning existing dishes...");
    await Food.deleteMany({});
    
    console.log(`Inserting ${seedData.length} unique dummy dishes...`);
    await Food.insertMany(seedData);
    console.log("Seeding successful!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();
