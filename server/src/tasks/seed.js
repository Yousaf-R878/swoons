import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import { userData } from '../data/index.js';
import * as userFuncs from '../data/users.js'
import * as dateFuncs from '../data/dates.js'

const db = await dbConnection();

let main = async () => {
    try{
        let user1 = await userFuncs.create("123abc567","Kyle","Halton","kyle@kyle.com","Password123!");
        console.log(user1);

        // let date1 = await dateFuncs.createDate("Kyle's Date 1");
        // let addDate = await userFuncs.addDate(user1._id, date1._id);

        // let date2 = await dateFuncs.createDate("Kyle's Date 2");
        // let addDate2 = await userFuncs.addDate(user1._id, date2._id);


        // let user2 = await userFuncs.create("Michael", "Thomas", "michael@michael.com", "Password456!");

        // let date3 = await dateFuncs.createDate("Michael's Date 1");
        // let addDate3 = await userFuncs.addDate(user2._id, date3._id);

        // let likedDate = await userFuncs.addLikedDate(user1._id, date3._id);

    } catch (e){
        console.log(e);
    }
};

console.log("Seeding DB...");
await main();
//await db.dropDatabase();
await closeConnection();
console.log("Done Seeding DB!");