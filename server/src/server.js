import express from "express";
import configRoutes from "./routes/index.js";
import cors from "cors";
import admin from "./config/firebase-config.js"; // DO NOT DELETE THIS

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"], // Array of allowed origins
    credentials: true, // Allow cookies to be sent
  })
);
app.use(express.json());
// health check
app.get("/", async function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  return res.status(200).json({
    ping: "pong",
  });
});

configRoutes(app);

app.listen(3000, () => {
  console.log("Swoons server running!");
  console.log("Your routes will be running on http://localhost:3000");
});
