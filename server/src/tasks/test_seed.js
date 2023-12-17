import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import { userData } from "../data/index.js";
import * as userFuncs from "../data/users.js";
import * as dateFuncs from "../data/dates.js";
import * as commentFuncs from "../data/comments.js";

const db = await dbConnection();
await db.dropDatabase();
console.log("Seeding DB...");

let user1Id, user2Id;
let date1Id, date2Id;

// Create User 1
try {
    const user1 = await userFuncs.create(
        "John",
        "Doe",

        "johndoe@email.com",
        "johndoer",
        "1212qwerA@"
    );
    user1Id = user1._id;
} catch (e) {
    console.log("Error creating user 1: " + e);
}

// Create User 2
try {
    const user2 = await userFuncs.create(
        "Jane",
        "Doe",
        "janedoe@email.com",
        "janedoe1448",
        "1212qwerA@"
    );
    user2Id = user2._id;
} catch (e) {
    console.log("Error creating user 2: " + e);
}

// Create Date 1
try {
    const date1 = await dateFuncs.createDate(
        "John's Date 1",
        ["Cozy", "Chill", "Movies"],
        [
            {
                name: "Dinner",
                location: "John's House",
                description: "We'll be having dinner at my house.",
            },
            {
                name: "Movies",
                location: "Local Movie Theater",
                description: "We'll be watching a movie at the local Movie Theater",
            },
        ],
        user1Id
    );
    date1Id = date1._id;
} catch (e) {
    console.log("Error creating date 1: " + e);
}

// Create Date 2

try {
    const date2 = await dateFuncs.createDate(
        "John's Date 2",
        ["Action", "Sport", "Quality time"],
        [
            {
                name: "Basketball",
                location: "Local Park",
                description: "We'll be playing basketball at my house.",
            },
            {
                name: "Spa",
                location: "Spa",
                description: "We'll be having a spa day at the local Spa!",
            },
        ],
        user1Id
    );
    date2Id = date2._id;
} catch (e) {
    console.log("Error creating date 2: " + e);
}

// User 2 likes Date 1

try {
    const like1 = await userFuncs.likeADate(user2Id, date1Id);
} catch (e) {
    console.log("Error liking date 1: " + e);
}

// User 2 comments under Date 1

try {
    const comment1 = await commentFuncs.postComment(
        date1Id,
        user2Id,
        "This is a comment under date 1"
    );
} catch (e) {
    console.log("Error commenting under date 1: " + e);
}

await closeConnection();
console.log("Done Seeding DB!");