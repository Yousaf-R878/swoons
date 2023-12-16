import * as helpers from "./helpers.js";
import { dates } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { getDate } from "./dates.js";

export const getAllComments = async (dateId) => {
    const date = await getDate(dateId);
    return date.comments;
};

export const postComment = async (dateId, username, comment) => {
    let date = await getDate(dateId);
    comment = helpers.checkComment(comment, "Comment");
    let newComment = {
        username: username,
        comment: comment,
        time: new Date(),
    };
    date.comments.push(newComment);
    const dateCollection = await dates();
    const updateInfo = await dateCollection.updateOne(
        { _id: new ObjectId(dateId) },
        { $set: date }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
        throw "Could not add comment";
    return newComment;
}


