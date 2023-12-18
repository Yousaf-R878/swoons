import express from "express";
import configRoutes from "./routes/index.js";
import cors from "cors";
import admin from "./config/firebase-config.js"; // DO NOT DELETE THIS

const app = express();

app.use(express.json());
app.use(cors());

configRoutes(app);

app.listen(3000, () => {
  console.log("Swoons server running!");
  console.log("Your routes will be running on http://localhost:3000");
});
