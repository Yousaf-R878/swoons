import * as helpers from './helpers.js'
import * as dateFuncs from './dates.js'
import { dates, users } from '../config/mongoCollections.js'
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

//User: { id: firstName: lastName: email: password: likedPosts: [] dates: [] picture }
export let create = async (
    uid,
    firstName,
    lastName,
    email,
    password,
) => {
    //Input Validation
    uid = helpers.checkString(uid, "Uid");
    firstName = helpers.checkName(firstName, 'First Name');
    lastName = helpers.checkName(lastName, 'Last Name');
    email = helpers.checkEmail(email, "Email");
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
        _id: uid,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashed_password,
        likedDates: [],
        dates: [],
        picture: '../public/default_profile_pic.jpg'
    }

    let addInfo = await usersCollection.insertOne(newUser);
    if (!addInfo.acknowledged || !addInfo.insertedId){
        throw `User could not be created`
    }

    //Get by id to return (Just to double check)
    let newId = addInfo.insertedId;
    let user = await get(newId);
    return user;
}

export let getAll = async () => {
    let usersCollection = await users();
    let usersList = await usersCollection.find({}).toArray();
    if (!usersList){
        throw `Could not get all users`
    }
    
    return usersList;
}

export let get = async (id) => {
    id = helpers.checkString(id, "User ID");

    let usersCollection = await users();
    let user = await usersCollection.findOne({
        _id: id
    });

    if (user === null){
        throw `No User with that ID (${id})`
    }

    let returnUser = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        likedDates: user.likedDates,
        dates: user.dates,
        picture: user.picture
    }
    return returnUser;
}

export let remove = async (id) => {
    id = helpers.checkString(id, "User ID");

    let user = await get(id);
    
    let usersCollection = await users();
    let deletionInfo = await usersCollection.findOneAndDelete({
        _id: id
    });

    if (!deletionInfo){
        throw `Could not delete User with ID ${id}`
    }

    return `User ${id} has been successfully deleted!`
}

export let update = async (
    id,
    firstName,
    lastName,
    email,
    password
) => {
    id = helpers.checkString(id, `User (${id})'s Id`)
    
    let usersCollection = await users();

    let user = await get(id);

    firstName = helpers.checkName(firstName, `User (${id})'s First Name`);
    lastName = helpers.checkName(lastName, `User (${id})'s Last Name`);
    email = helpers.checkEmail(email, `User (${id})'s Email`);
    password = helpers.checkPassword(password, `User (${id})'s Password`);

    // let userPassHash = user.password;
    // let compare = bcrypt.compare(password, userPassHash);
    // if (compare){
    //     throw `User (${id})'s `
    // }

    let updatedUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    }
    let updateInfo = await usersCollection.findOneAndUpdate(
        {_id: id}, 
        {$set: updatedUser},
        {returnDocument: 'after'}
    );

    if (!updateInfo){
        throw `Could not update User (${id})`
    }

    return updateInfo;
}

export let addLikedDate = async (userId,dateId) => {
    userId = helpers.checkString(userId, `User (${userId})'s Id`);
    dateId = helpers.checkId(dateId, `Date (${dateId})'s Id`);

    let usersCollection = await users();
    
    let date = await dateFuncs.getDate(dateId);
    let user = await get(userId);

    let userLikedDates = user.likedDates
    if (userLikedDates.includes(dateId)){
        throw `User (${userId}) already liked that date (${dateId})`
    }

    let addInfo = await usersCollection.findOneAndUpdate(
        {_id: userId},
        {$push: {likedDates: dateId}},
        {returnDocument: 'after'}
    );

    if (!addInfo){
        throw `Could not add liked date (${dateId}) to User (${id})`
    }

    return addInfo;
}

export let removeLikedDate = async (userId,dateId) => {
    userId = helpers.checkString(userId, `User (${userId})'s Id`);
    dateId = helpers.checkId(dateId, `Date (${dateId})'s Id`);

    let usersCollection = await users();
    let date = await dateFuncs.getDate(dateId);
    let user = await get(userId);

    let userLikedDates = user.likedDates
    if (!userLikedDates.includes(dateId)){
        throw `User (${userId}) has not liked Date (${dateId})`
    }

    let removeInfo = await usersCollection.findOneAndUpdate(
        {_id: userId},
        {$pull: {likedDates: dateId}},
        {returnDocument: 'after'}
    );

    if (!removeInfo){
        throw `Could not remove liked Date (${dateId}) from User (${id})`
    }

    return removeInfo;
}

export let addDate = async (userId,dateId) => {
    userId = helpers.checkString(userId, `User (${userId})'s Id`);
    dateId = helpers.checkId(dateId, `Date (${dateId})'s Id`);

    let usersCollection = await users();
    let date = await dateFuncs.getDate(dateId);

    let user = await get(userId);

    let userDates = user.dates
    if (userDates.includes(dateId)){
        throw `User (${userId}) already added that date (${dateId})`
    }

    let addInfo = await usersCollection.findOneAndUpdate(
        {_id: userId},
        {$push: {dates: dateId}},
        {returnDocument: 'after'}
    );

    if (!addInfo){
        throw `Could not add date (${dateId}) to User (${id})`
    }

    return addInfo;
}

export let removeDate = async (userId,dateId) => {
    userId = helpers.checkString(userId, `User (${userId})'s Id`);
    dateId = helpers.checkId(dateId, `Date (${dateId})'s Id`);

    let usersCollection = await users();
    let date = await dateFuncs.getDate(dateId);

    let user = await get(userId);

    let userDates = user.dates
    if (!userDates.includes(dateId)){
        throw `User (${userId}) did not create that date (${dateId})`
    }

    let removeInfo = await usersCollection.findOneAndUpdate(
        {_id: userId},
        {$pull: {dates: dateId}},
        {returnDocument: 'after'}
    );

    if (!removeInfo){
        throw `Could not remove date (${dateId}) from User (${id})`
    }

    return removeInfo;
}
