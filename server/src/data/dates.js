import * as helpers from "./helpers.js";
import { dates, users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { get } from "./users.js";

export const getAllDates = async (
    tags = [],
    sorting = "disabled",
    page = 1,
    limit = 12
) => {
    const dateCollection = await dates();
    let query = {};

    if (tags.length > 0) {
        // make case insensitive
        query.tags = {
            $in: tags.map((tag) => new RegExp("^" + tag + "$", "i")),
        };
    }
    let sortQuery = {};
    if (sorting !== "disabled") {
        if (sorting === "recent") {
            sortQuery = { timeStamp: -1 };
        } else if (sorting === "likes") {
            sortQuery = { likes: -1 };
        } else if (sorting === "comments") {
            sortQuery = { commentsCount: -1 };
        } else if (sorting === "trending") {
            // put nothing for now
            sortQuery = {};
        } else {
            throw "Invalid sorting method";
        }
    }

    const datesByTags = await dateCollection
        .find(query)
        .sort(sortQuery)
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray();

    const totalPages = Math.ceil(
        (await dateCollection.countDocuments(query)) / limit
    );

    return {
        dates: datesByTags,
        totalPages: totalPages,
    };
};

export const getDate = async (id) => {
    id = helpers.checkId(id, "Date ID");

    const dateCollection = await dates();
    const date = await dateCollection.findOne({ _id: new ObjectId(id) });
    if (!date) throw "Date not found";
    date._id = date._id.toString();
    return date;
};

export const getLikedDatesbyUserId = async (userId) => {
    const user = await get(userId);
    // console.log(user);
    const dateCollection = await dates();

    // const likedDates implement

    return likedDates;
};

export const getCreatedDatesbyUserId = async (userId) => {
    // Assuming `db` is your connected MongoDB client and `dates` is your collection name

    const user = await get(userId);
    if (!user) {
        throw "User not found";
    }
    // console.log("User:", user);

    const dateCollection = await dates();

    const userDates = await dateCollection
        .find({
            "creator.username": user.username,
        })
        .toArray();

    // console.log("User Dates:", userDates);

    return userDates;
};

export const createDate = async (title, tagArray, eventArray, userId) => {
    title = helpers.checkTitle(title, "Date Title");
    tagArray = helpers.checkTagArray(tagArray, "Tag Array");
    eventArray = helpers.checkEventArray(eventArray, "Event Array");
    userId = helpers.checkUserId(userId, "User ID");

    const dateCollection = await dates();

    const author = await get(userId);

    //add username

    const newDate = {
        title: title,
        tags: [...new Set(tagArray)],
        events: eventArray,
        likes: 0,
        comments: [],
        commentsCount: 0,
        creator: {
            firstName: author.firstName,
            lastName: author.lastName,
            username: author.username,
            picture: author.picture,
        },
        timeStamp: new Date(),
    };

    newDate.events.forEach((event) => {
        event.tripAdvisorLocationImages = event.tripAdvisorLocationImages || [];
        event.tripAdvisorLocationUrl = event.tripAdvisorLocationUrl || "";
        event.tripAdvisorLocationRating = event.tripAdvisorLocationRating || "";
        event.tripAdvisorLocationRatingImage =
            event.tripAdvisorLocationRatingImage || "";
    });

    const insertInfo = await dateCollection.insertOne(newDate);
    if (insertInfo.insertedCount === 0) throw "Could not add date";

    const newId = insertInfo.insertedId.toString();

    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
        { _id: userId },
        { $push: { dates: newId } },
        { returnDocument: "after" }
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
        throw "Could not add date to user";

    const date = await getDate(newId);
    return date;
};

export const deleteDate = async (dateId, userId) => {
    dateId = helpers.checkId(dateId, "Date ID");
    const dateCollection = await dates();
    //TODO DELETE ID FROM THE USER
    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
        { _id: userId },
        { $pull: { dates: dateId } },
        { returnDocument: "after" }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
        throw "Could not delete date from user";

    const deletionInfo = await dateCollection.deleteOne(
        {
            _id: new ObjectId(dateId),
        },
        { returnDocument: "after" }
    );
    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete date with id of ${id}`;
    }
    return deletionInfo;
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

// Date
// {
//   _id:
//   title:
//   tags: []
//   events: [
//     {

//       name:
//       location:
//       description:
//       tripAdvisorLocationImage:
//       tripAdvisorRating:
//       tripAdvisorRatingImage:
//       tripAdvisorLocationId:
//       tripAdvisorLocationUrl:
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
//   ],
//   commentsCount:
//   timeStamp: //for when date is created
// }
