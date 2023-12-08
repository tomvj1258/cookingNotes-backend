import { RecipeModel } from "../models/RecipeSchema.js";
import { UserModel } from "../models/UserSchema.js";

export const getAllRecipes = async (req, res) => {
   try {
      const recipe = await RecipeModel.find({});

      res.json(recipe);
   } catch (err) {
      console.error("Err", err.message);
      res.json({ message: "can't get Recipes" });
   }
};

export const createRecipes = async (req, res) => {
   const {
      title,
      ingredients,
      instructions,
      image,
      category,
      foodType,
      ...rest
   } = req.body;

   try {
      const recipe = await RecipeModel.find({});

      const newRecipe = new RecipeModel(req.body);

      await newRecipe.save();
      res.json({ newRecipe, message: "Recipe added successfully" });
   } catch (err) {
      console.error("Err", err.message);
   }
};

export const saveRecipes = async (req, res) => {
   const { userId, recipeId } = req.body;

   try {
      const recipe = await RecipeModel.findById(recipeId);
      const user = await UserModel.findById(userId);

      user.savedRecipes.push(recipe);
      await user.save();

      res.json({
         savedRecipes: user.savedRecipes,
         message: "Recipe saved",
      });
   } catch (err) {
      console.error("Err", err);
      res.json({
         message: "Recipe not saved",
         err,
      });
   }
};

export const getSavedRecipes = async (req, res) => {
   try {
      const user = await UserModel.findById(req.params.userId);
      // console.log("user", user);
      res.json({ savedRecipes: user?.savedRecipes });
   } catch (err) {
      console.error("Err", err);
      res.json(err);
   }
};

export const getUserSavedRecipes = async (req, res) => {
   try {
      const user = await UserModel.findById(req.params.userId);
      // console.log("user", user);

      const savedRecipes = await RecipeModel.find({
         _id: { $in: user.savedRecipes },
      });

      res.json({ savedRecipes });
   } catch (err) {
      console.error("Err", err);
      res.json(err);
   }
};

export const getMyRecipes = async (req, res) => {
   try {
      const user = await UserModel.findById(req.params.userId);

      // console.log("user: ", user);
      const myRecipes = await RecipeModel.find({
         userOwner: { $in: user._id },
      });
      // console.log(myRecipes);

      res.json(myRecipes);
   } catch (err) {
      console.error("Err", err);
      res.json(err);
   }
};
