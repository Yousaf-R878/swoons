import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import { userData } from '../data/index.js';
import * as userFuncs from '../data/users.js'

const db = await dbConnection();

let main = async () => {
    try{
        let user = await userFuncs.create("Kyle","Halton","kyle@kyle.com","Password123!");
        console.log(user);

        let getUser = await userFuncs.get(user._id);
        console.log(getUser);
        //let getUserError = await userFuncs.get('656144459cea04fc28ad33a2')
        //Test ID (Doesnt exist): '656144459cea04fc28ad33a2'

        let user2 = await userFuncs.create("Michael", "Michaelton", "michael@michael.com", "Password456!");

        // let getAll = await userFuncs.getAll();
        // console.log(getAll);

        let updateUser2 = await userFuncs.update(user2._id,"Mike","Miketon","mike@mike.com","Mike123!");
        console.log(updateUser2);

        //let removeUser = await userFuncs.remove(user2._id);

        //let getRemove = await userFuncs.get(user2._id);

        let addPost = await userFuncs.addPost(user2._id, '656144459cea04fc28ad33a2');
        console.log(addPost);

        let removePost = await userFuncs.removePost(user2._id,'656144459cea04fc28ad33a2');
        console.log(removePost)

        let addDate = await userFuncs.addDate(user2._id,'656144459cea04fc28ad33a2');
        console.log(addDate);

        let removeDate = await userFuncs.removeDate(user2._id,'656144459cea04fc28ad33a2');
        console.log(removeDate);

    } catch (e){
        console.log(e);
    }

};









await main();
await db.dropDatabase();
await closeConnection();