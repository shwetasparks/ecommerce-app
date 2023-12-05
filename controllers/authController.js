// Import necessary modules and dependencies
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

// Step 1: Define a register controller
export const registerController = async (req, res) => {
  try {
    // Sub-step 1.1: Destructure data from the request body
    const { name, email, password, phone, address } = req.body;

    // Sub-step 1.2: Validation for required fields
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }

    // Sub-step 1.3: Check if the user already exists
    const existingUser = await userModel.findOne({ email });

    // Sub-step 1.4: Return a response if the user already exists
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }

    // Sub-step 1.5: Hash the password and register the user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    // Sub-step 1.6: Send a success response
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log("Error in registration controller", error);
    // Sub-step 1.7: Handle errors and send an error response

    res.status(500).send({
      message: "Error in registeration",
      success: false,
      error,
    });
  }
};

// Step 2: Define a POST login controller
export const loginController = async (req, res) => {
  try {
    // Sub-step 2.1: Destructure email and password from the request body
    const { email, password } = req.body;

    // Sub-step 2.2: Validation for email and password
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Sub-step 2.3: Check if the user exists
    const user = await userModel.findOne({ email });

    // Sub-step 2.4: Return a response if the user doesn't exist
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Sub-step 2.5: Compare the provided password with the stored hashed password
    const match = await comparePassword(password, user.password);

    // Sub-step 2.6: Return a response if the password is invalid
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Sub-step 2.7: Generate a JWT token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Sub-step 2.8: Send a success response with the token
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    // Sub-step 2.9: Handle errors and send an error response
    console.log(error);
    res.status(500).send({
      message: "Error in login",
      success: false,
      error,
    });
  }
};

//test Controller
export const testController = (req, res) => {
  res.send("protected Route");
};
