import * as helpers from "./helpers.js";
import { dates } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { getDate } from "./dates.js";
import { get } from "./users.js";

export const getAllComments = async (dateId) => {
    const date = await getDate(dateId);
    return date.comments;
};

export const postComment = async (dateId, userId, comment) => {
    comment = helpers.checkComment(comment, "Comment");
    userId = helpers.checkId(userId, "User ID");
    dateId = helpers.checkId(dateId, "Date ID");

    const dateCollection = await dates();

    const date = await getDate(dateId);
    const user = await get(userId);

    let username = user.firstName + " " + user.lastName;
    let newComment = {
        username: username,
        comment: comment,
        time: new Date(),
    };

    const updateInfo = await dateCollection.updateOne(
        { _id: new ObjectId(dateId) },
        { $push: { comments: newComment } }
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
        throw "Could not add comment";

    return newComment;
};