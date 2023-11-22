import * as helpers from './helpers.js'
import { users } from '../config/mongoCollections.js'
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

//User: { id: firstName: lastName: email: password: likedPosts: [] dates: [] picture }
export let create = async (
    firstName,
    lastName,
    email,
    password,
) => {
    //Input Validation
    firstName = helpers.checkName(firstName, 'First Name');
    lastName = helpers.checkName(lastName, 'Last Name');
    email = helpers.checkEmail(email);
    password = helpers.checkPassword(password, "Password");

    //Check if email is already associated with user
    const usersCollection = await users();
    let userExists = await usersCollection.findOne({email: email});
    if(userExists){
        throw `User with that email (${email}) already exists!`
    }

    let saltRounds = 10;
    let hashed_password = await bcrypt.hash(password, saltRounds);

    let newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashed_password,
        likedPosts: [],
        dates: [],
        picture: null
    }

    let addInfo = await usersCollection.insertOne(newUser);
    if (!addInfo.acknowledged || !addInfo.insertedId){
        throw `User could not be created`
    }

    //Get by id to return (Just to double check)
    let newId = addInfo.insertedId.toString();
    let user = await get(newId);
    return user;
}

export let getAll = async () => {
    let usersCollection = await users();
    let usersList = await usersCollection.find({}).toArray();
    if (!usersList){
        throw `Could not get all users`
    }
    usersList = usersList.map((user) =>{
        user._id = user._id.toString();
    })
    return usersList;
}

export let get = async (id) => {
    id = helpers.checkId(id, "User ID");

    let usersCollection = await users();
    let user = await usersCollection.findOne({
        _id: new ObjectId(id)
    });

    if (user === null){
        throw `No User with that ID (${id})`
    }

    let returnUser = {
        _id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        likedPosts: user.likedPosts,
        dates: user.dates,
        picture: user.picture
    }
    return returnUser;
}

export let remove = async (id) => {
    id = helpers.checkId(id, "User ID");

    let user = await get(id);
    
    let usersCollection = await users();
    let deletionInfo = await usersCollection.findOneAndDelete({
        _id: new ObjectId(id)
    });

    if (!deletionInfo){
        throw `Could not delete User with ID ${id}`
    }

    return `User ${id} has been successfully deleted!`
}