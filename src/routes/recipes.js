import express from "express";
import {
   createRecipes,
   getAllRecipes,
   getMyRecipes,
   getSavedRecipes,
   getUserSavedRecipes,
   saveRecipes,
} from "../controller/RecipesController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getAllRecipes);
router.post("/", verifyToken, createRecipes);
router.put("/", verifyToken, saveRecipes);
router.get("/savedRecipes/id/:userId", getSavedRecipes);
router.get("/savedRecipes/:userId", getUserSavedRecipes);
router.get("/myRecipes/:userId", getMyRecipes);

export { router as recipesRouter };
