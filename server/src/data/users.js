import * as helpers from './helpers.js'
import * as dateFuncs from './dates.js'
import { dates, users } from '../config/mongoCollections.js'
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

//User: { id: firstName: lastName: email: password: likedPosts: [] dates: [] picture }
export let create = async (
    firstName,
    lastName,
    email,
    username,
    password,
) => {
    //Input Validation
    firstName = helpers.checkName(firstName, 'First Name');
    lastName = helpers.checkName(lastName, 'Last Name');
    username = helpers.checkAlphanumeric(username, "Username");
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
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
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
    
    let returnList = usersList.map((user) =>{
        user._id = user._id.toString();
        return user
    })
    return returnList;
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
        username: user.username,
        email: user.email,
        password: user.password,
        likedDates: user.likedDates,
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

export let update = async (
    id,
    firstName,
    lastName,
    username,
    email,
    password
) => {
    id = helpers.checkId(id, `User (${id})'s Id`)
    
    let usersCollection = await users();

    let user = await get(id);

    firstName = helpers.checkName(firstName, `User (${id})'s First Name`);
    lastName = helpers.checkName(lastName, `User (${id})'s Last Name`);

    username = helpers.checkAlphanumeric(username, `User (${id})'s Username`);
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
        username: username,
        email: email,
        password: password
    }
    let updateInfo = await usersCollection.findOneAndUpdate(
        {_id: new ObjectId(id)}, 
        {$set: updatedUser},
        {returnDocument: 'after'}
    );

    if (!updateInfo){
        throw `Could not update User (${id})`
    }
    updateInfo._id = updateInfo._id.toString();
    return updateInfo;
}

export let likeADate = async (userId,dateId) => {
    userId = helpers.checkId(userId, `User (${userId})'s Id`);
    dateId = helpers.checkId(dateId, `Date (${dateId})'s Id`);

    let usersCollection = await users();
    let dateCollection = await dates();
    
    let user = await get(userId);

    let userLikedDates = user.likedDates
    if (userLikedDates.includes(dateId)){
        throw `User (${userId}) already liked that date (${dateId})`
    }

    let addInfo = await usersCollection.findOneAndUpdate(
        {_id: new ObjectId(userId)},
        {$push: {likedDates: dateId}},
        {returnDocument: 'after'}
    );

    if (!addInfo){
        throw `Could not add liked date (${dateId}) to User (${id})`
    }

    let updatedDate = await dateCollection.findOneAndUpdate(
        {_id: new ObjectId(dateId)},
        {$inc: {likes: 1}},
        {returnDocument: 'after'}
    );

    addInfo._id = addInfo._id.toString();
    return addInfo;
}

export let unlikeADate = async (userId,dateId) => {
    userId = helpers.checkId(userId, `User (${userId})'s Id`);
    dateId = helpers.checkId(dateId, `Date (${dateId})'s Id`);

    let usersCollection = await users();
    let date = await dateFuncs.getDate(dateId);
    let user = await get(userId);

    let userLikedDates = user.likedDates
    if (!userLikedDates.includes(dateId)){
        throw `User (${userId}) has not liked Date (${dateId})`
    }

    let removeInfo = await usersCollection.findOneAndUpdate(
        {_id: new ObjectId(userId)},
        {$pull: {likedDates: dateId}},
        {returnDocument: 'after'}
    );

    if (!removeInfo){
        throw `Could not remove liked Date (${dateId}) from User (${id})`
    }

    removeInfo._id = removeInfo._id.toString();
    return removeInfo;
}

// export let addDate = async (userId,dateId) => {
//     userId = helpers.checkId(userId, `User (${userId})'s Id`);
//     dateId = helpers.checkId(dateId, `Date (${dateId})'s Id`);

//     let usersCollection = await users();
//     let date = await dateFuncs.getDate(dateId);

//     let user = await get(userId);

//     let userDates = user.dates
//     if (userDates.includes(dateId)){
//         throw `User (${userId}) already added that date (${dateId})`
//     }

//     let addInfo = await usersCollection.findOneAndUpdate(
//         {_id: new ObjectId(userId)},
//         {$push: {dates: dateId}},
//         {returnDocument: 'after'}
//     );

//     if (!addInfo){
//         throw `Could not add date (${dateId}) to User (${id})`
//     }

//     addInfo._id = addInfo._id.toString();
//     return addInfo;
// }

export let removeDate = async (userId,dateId) => {
    userId = helpers.checkId(userId, `User (${userId})'s Id`);
    dateId = helpers.checkId(dateId, `Date (${dateId})'s Id`);

    let usersCollection = await users();
    let date = await dateFuncs.getDate(dateId);

    let user = await get(userId);

    let userDates = user.dates
    if (!userDates.includes(dateId)){
        throw `User (${userId}) did not create that date (${dateId})`
    }

    let removeInfo = await usersCollection.findOneAndUpdate(
        {_id: new ObjectId(userId)},
        {$pull: {dates: dateId}},
        {returnDocument: 'after'}
    );

    if (!removeInfo){
        throw `Could not remove date (${dateId}) from User (${id})`
    }

    removeInfo._id = removeInfo._id.toString();
    return removeInfo;
}
