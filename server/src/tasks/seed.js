import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import * as userFuncs from "../data/users.js";
import * as dateFuncs from "../data/dates.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = await dbConnection();
await db.dropDatabase();
console.log("Seeding DB...");

// Store created user IDs
const userIds = [];

try {
    // Read users from JSON file and create them
    const usersData = JSON.parse(
        fs.readFileSync(path.join(__dirname, "users.json"), "utf-8")
    );

    for (const userData of usersData) {
        try {
            const createdUser = await userFuncs.create(
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
        fs.readFileSync(path.join(__dirname, "dates.json"), "utf-8")
    );

    for (const [index, dateData] of datesData.entries()) {
        try {
            // Assign a user ID from the created users at random
            const randomUserId =
                userIds[Math.floor(Math.random() * userIds.length)];
            await dateFuncs.createDate(
                dateData.title,
                dateData.tagArray,
                dateData.eventArray,
                randomUserId
            );
            console.log(`Date ${dateData.title} created successfully.`);
        } catch (e) {
            console.error(`Error creating date ${dateData.title}: ${e}`);
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
