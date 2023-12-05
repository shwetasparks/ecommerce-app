import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
  } catch (err) {
    console.log("error connecting to database", err);
  }
};
export default connectDB;
