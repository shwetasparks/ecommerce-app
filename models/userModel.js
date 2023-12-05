import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);
export default mongoose.model("users", userSchema);
