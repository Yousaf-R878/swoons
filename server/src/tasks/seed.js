import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import { userData } from '../data/index.js';
import * as userFuncs from '../data/users.js'

const db = await dbConnection();

let main = async () => {
    try{
        let user1 = await userFuncs.create("Kyle","Halton","kyle@kyle.com","Password123!");
        let likedPost = await userFuncs.addLikedDate(user1._id, '656144459cea04fc28ad33a2');
        let addDate = await userFuncs.addDate(user1._id, '656144459cea04fc28ad33a2');

        let user2 = await userFuncs.create("Michael", "Michaelton", "michael@michael.com", "Password456!");

    } catch (e){
        console.log(e);
    }
};

await main();
await closeConnection();