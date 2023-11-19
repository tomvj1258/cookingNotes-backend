import express from "express";
import {
   createRecipes,
   getAllRecipes,
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

export { router as recipesRouter };
