import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   email: { type: String, reqiuired: true, unique: true },
   password: { type: String, reqiuired: true },
   username: { type: String, reqiuired: true },
   savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
   myRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
});

export const UserModel = mongoose.model("users", UserSchema);
