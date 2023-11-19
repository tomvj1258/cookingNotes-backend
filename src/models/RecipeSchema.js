import mongoose from "mongoose";

const RecipeSchema = mongoose.Schema({
   title: { type: String, required: true },
   foodType: { type: String, required: true },
   category: { type: String, required: true },
   ingredients: [{ type: String, required: true }],
   instructions: { type: String, required: true },
   image: { type: String },
   cookingTime: { type: Number, required: true },
   userOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
   },
});

export const RecipeModel = mongoose.model("recipes", RecipeSchema);
