import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import * as userFuncs from "../data/users.js";
import * as dateFuncs from "../data/dates.js";
import * as commentFuncs from "../data/comments.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import admin from "../config/firebase-config.js"; // DO NOT DELETE THIS
import { getAuth } from "firebase-admin/auth";
import { get } from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = await dbConnection();
await db.dropDatabase();
console.log("Seeding DB...");

// Store created user IDs and date IDs for later
const userIds = [];
const dateIds = [];

try {
  const allUsers = await getAuth().listUsers();
  for (const user of allUsers.users) {
    await getAuth().deleteUser(user.uid);
  }

  // Read users from JSON file and create them
  const usersData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "users.json"), "utf-8")
  );

  for (const userData of usersData) {
    try {
      const userRecord = await getAuth().createUser({
        email: userData.email,
        password: userData.password,
      });
      const createdUser = await userFuncs.create(
        userRecord.uid,
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.username,
        userData.password
      );
      userIds.push(createdUser._id); // Store the user ID for later
      console.log(`User ${userData.username} created successfully.`);
    } catch (e) {
      console.error(`Error creating user ${userData.username}: ${e}`);
    }
  }

  // Read dates from JSON file and create them with user IDs
  const datesData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "datesModified.json"), "utf-8")
  );

  for (const [index, dateData] of datesData.entries()) {
    try {
      // Assign a user ID from the created users at random
      const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
      // console.log({
      //     title: dateData.title,
      //     tagArray: dateData.tagArray,
      //     eventArray: dateData.eventArray,
      //     userId: randomUserId
      // })
      const createdDate = await axios.post("http://localhost:3000/dates", {
        title: dateData.title,
        tagArray: dateData.tagArray,
        eventArray: dateData.eventArray,
        userId: randomUserId,
      });

      dateIds.push(createdDate.data._id); // Store the date ID for later
      console.log(`Date ${dateData.title} created successfully.`);
    } catch (e) {
      console.error(`Error creating date ${dateData.title}: ${e}`);
    }
  }

  // random users like random dates
  // console.log(dateIds);
  for (const userId of userIds) {
    try {
      const numDatesToLike = Math.floor(Math.random() * 10);

      let randomDates = [];
      for (let i = 0; i < numDatesToLike; i++) {
        const randomDateId =
          dateIds[Math.floor(Math.random() * dateIds.length)];
        randomDates.push(randomDateId);
      }

      randomDates = [...new Set(randomDates)];

      for (const randomDateId of randomDates) {
        await userFuncs.likeADate(userId, randomDateId);
        // console.log(
        //     `User ${userId} liked date ${randomDateId} successfully.`
        // );
      }
    } catch (e) {
      console.error(`Error liking date: ${e}`);
    }
  }

  // random users comment on random dates

  for (const userId of userIds) {
    try {
      const numDatesToComment = Math.floor(Math.random() * 10);

      let randomDates = [];
      for (let i = 0; i < numDatesToComment; i++) {
        const randomDateId =
          dateIds[Math.floor(Math.random() * dateIds.length)];
        randomDates.push(randomDateId);
      }

      randomDates = [...new Set(randomDates)];

      for (const randomDateId of randomDates) {
        await commentFuncs.postComment(
          randomDateId,
          userId,
          "This is a comment!"
        );
        // console.log(
        //     `User ${userId} commented on date ${randomDateId} successfully.`
        // );
      }
    } catch (e) {
      console.error(`Error commenting on date: ${e}`);
    }
  }
} catch (e) {
  console.error(`Error seeding database: ${e}`);
}

// try to get all dates
// try {
//     const allDates = await dateFuncs.getAllDates();
//     // print date 1-5
//     console.log("Printing first five dates:");
//     for (let i = 0; i < 5; i++) {
//         console.log(allDates[i]);
//     }
// } catch (e) {
//     console.error(`Error getting all dates: ${e}`);
// }

// try to get all dates, but with tags
// try {
//     const allDates = await dateFuncs.getAllDates(["adventurous"]);
//     // print date 1-5
//     console.log("Printing first five dates with tag food:");
//     for (let i = 0; i < 5; i++) {
//         console.log(allDates[i]);
//     }
// } catch (e) {
//     console.error(`Error getting all dates: ${e}`);
// }

await closeConnection();
console.log("Done Seeding DB!");
