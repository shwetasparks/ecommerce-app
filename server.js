import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";

//configure env
dotenv.config();

//databasse config
connectDB();

//rest object
const app = express();
app.use(express.json());

//middleware
app.use(express.json()); //must for sending data
app.use(morgan("dev"));
app.use(cors);

//routes
app.use("/api/v1/auth", authRoutes);

//rest api
app.get("/", (req, res) => {
  res.send({ message: "welcome to ecommerce app" });
});

//protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
