import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRouter } from "./src/routes/auth.js";
import { recipesRouter } from "./src/routes/recipes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
   origin: true,
};
//Middleware

app.use(express.json());
app.use(cors(corsOptions));

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

app.get("/", (req, res) => {
   res.send("App is running");
});

mongoose.set("strictQuery", false);
const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGODB_URL);

      console.log("MongoDB database is connected");
   } catch (err) {
      console.log("MongoDB database connection is failed" + err);
   }
};

app.listen(port, () => {
   connectDB();
   console.log("Server is running in port " + port);
});
