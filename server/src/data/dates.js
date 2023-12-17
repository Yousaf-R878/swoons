// Date:getDate
// {
//   id:
//   title:
//   tags: []
//   events: [
//     {
//       id:
//       name:
//       location:
//       rating:
//       ratingImage:
//       locationUrl:
//     },
//     ...
//   ]
//   likes:
//   comments: [
//     {
//       username:
//       comment:
//       time: 
//     },
//     ...
//   ]
//   timeStamp: //for when date is created
// }

import * as helpers from "./helpers.js";
import { dates, users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { get } from "./users.js";

export const getAllDates = async () => {
    const dateCollection = await dates();
    const dateList = await dateCollection.find({}).toArray();
    if (!dateList) {
        throw `Could not get all dates`;
    }
    let returnList = dateList.map((date) => {
        date._id = date._id.toString();
        return date;
    });
    return returnList;
};

export const getDate = async (id) => {
    id = helpers.checkId(id, "Date ID");

    const dateCollection = await dates();
    const date = await dateCollection.findOne({ _id: new ObjectId(id) });
    if (!date) throw "Date not found";
    date._id = date._id.toString();
    return date;
};

export const createDate = async (title, tagArray, eventArray, userId) => {
    title = helpers.checkTitle(title, "Date Title");
    tagArray = helpers.checkTagArray(tagArray, "Tag Array");
    eventArray = helpers.checkEventArray(eventArray, "Event Array");
    userId = helpers.checkId(userId, "User ID");

    const dateCollection = await dates();

    // get User by ID

    const author = await get(userId);
    const name = author.firstName + author.lastName;
    const userPicture = author.picture;
    //add username


    const newDate = {
        title: title,
        tags: tagArray,
        events: eventArray,
        likes: 0,
        comments: [],
        creator: {
            name: name,
            picture: userPicture,
            username: name 
            //add username in user
        }
    };

    const insertInfo = await dateCollection.insertOne(newDate);
    if (insertInfo.insertedCount === 0) throw "Could not add date";

    const newId = insertInfo.insertedId.toString();

    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $push: { dates: newId } },
        { returnDocument: "after" }
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
        throw "Could not add date to user";

    const date = await getDate(newId);
    return date;
};

export const deleteDate = async (id) => {
    id = helpers.checkId(id, "Date ID");
    const dateCollection = await dates();
    const date = await getDate(id);
    //TODO DELETE ID FROM THE USER
    const deletionInfo = await dateCollection.removeOne({
        _id: new ObjectId(id),
    });
    if (deletionInfo.deletedCount === 0) throw "Could not delete date";
    return date;
};

//TODO: CHANGE TO IMAGEURL ARRAY AND THEN UPDATE FRONTEND TO HAVE MULTIPLE IMAGES PER LOCATION

export const removeEventFromDate = async (dateId, eventIndex) => {
    dateId = helpers.checkId(dateId, "Date ID");

    const dateCollection = await dates();

    const date = await getDate(dateId);

    if (eventIndex < 0 || eventIndex >= date.events.length) {
        throw "Event index out of bounds";
    }

    const updatedInfo = await dateCollection.updateOne(
        { _id: new ObjectId(dateId) },
        { $pull: { events: { _id: eventIndex } } },
        { returnDocument: "after" }
    );

    if (updatedInfo.modifiedCount === 0) {
        throw "Could not update date successfully";
    }

    return date;
};