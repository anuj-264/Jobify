import mongoose from "mongoose";



const connectDB = async () => { 
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`MONGODB connected!!`); 
    } catch (error) {
        console.error(` MONGODB connection Failed: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;