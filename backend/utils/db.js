import mongoose from "mongoose";
import dns from "dns";

// Fix for Node.js SRV lookup issues on Windows / local DNS resolvers
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    try {
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongo db connected susccefully");    
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;