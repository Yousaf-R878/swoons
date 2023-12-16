import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import { userData } from '../data/index.js';
import * as userFuncs from '../data/users.js'
import * as dateFuncs from '../data/dates.js'

const db = await dbConnection();
await db.dropDatabase();
console.log("Seeding DB...");

let user1Id, user2Id;

// Create User 1
try {
    const user1 = await userFuncs.create("John", "Doe", "johndoe@email.com", "1212qwerA@");
    user1Id = user1._id;
} catch (e) {
    console.log("Error creating user 1: " + e);
}

// Create User 2
try {
    const user2 = await userFuncs.create("Jane", "Doe", "janedoe@email.com", "1212qwerA@");
    user2Id = user2._id;

} catch (e) {
    console.log("Error creating user 2: " + e);
}

// Create Date 1
try {
    const date1 = await dateFuncs.createDate("John's Date 1", ["Cozy", "Chill", "Movies"], [
        {
            title: "Dinner",
            location: "John's House",
            time: new Date("2021-03-25T18:00:00Z")
        },
        {
            title: "Movie",
            location: "John's House",
            time: new Date("2021-03-25T20:00:00Z")
        }
    ], user1Id);
}
catch (e) {
    console.log("Error creating date 1: " + e);
}


await closeConnection();
console.log("Done Seeding DB!");