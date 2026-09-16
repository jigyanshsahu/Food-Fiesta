import mongoose from "mongoose";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() => console.log("db connected"));
}