import express from "express";
import configRoutes from './routes/index.js'
import admin from "firebase-admin";
admin.initializeApp({
  credential: admin.credential.cert("snoopers-de724-firebase-adminsdk-qzswl-2b73a4d26c.json"),
  databaseURL: 'snoopers-de724.firebaseapp.com'
})
const app = express();

app.use(express.json());



configRoutes(app);

app.listen(3000, () => {
  console.log("Swoons server running!");
  console.log("Your routes will be running on http://localhost:3000");
});
