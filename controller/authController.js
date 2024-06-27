import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    // validations
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    // validations
    if (!email) {
      return res.send({ error: "email is required" });
    }
    // validations
    if (!password) {
      return res.send({ error: "password is required" });
    }
    // validations
    if (!phone) {
      return res.send({ error: "phone is required" });
    }
    // validations
    if (!address) {
      return res.send({ error: "address is required" });
    }
    //creating user
    const existingUser = await userModel.findOne({ email });
    // existing user
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register pleae login",
      });
    }
    // register user
    const hashedPassword = await hashPassword(password);
    // save user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registeration",
      error,
    });
  }
};
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "email not registered",
      });
    }
    // compare password from authhelper and password entered by user
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "invalid password",
      });
    }
    //token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
// test controller
export const testController = (req, res) => {
  res.send("protected route");
};
