import { UserModel } from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
   try {
      const { email, username, password } = req.body;

      const user = await UserModel.findOne({ email });

      console.log("FoundUser:", user);
      if (user) {
         return res.json({ message: "User already exists" });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
         email,
         username,
         password: hashPassword,
      });

      await newUser.save();

      res.json({
         success: true,
         message: "User successfully registered",
      });
   } catch (err) {
      console.log("errMsg: " + err);
      res.json({ message: "Internal error try again!" });
   }
};

export const login = async (req, res) => {
   try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });

      if (!user) {
         return res.json({ message: "User not Found" });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      // console.log(isPasswordMatch);

      if (!isPasswordMatch) {
         return res.json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

      const { username } = user._doc;

      res.json({
         message: "succssfully login",
         token,
         userId: user._id,
         Email: user.email,
         username,
      });
   } catch (err) {
      console.log("errMsg: " + err);
      res.json({
         message: "Failed to login try again",
      });
   }
};
