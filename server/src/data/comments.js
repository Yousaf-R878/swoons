import * as helpers from "./helpers.js";
import { dates } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { getDate } from "./dates.js";
import { get } from "./users.js";

export const getAllComments = async (dateId) => {
    const date = await getDate(dateId);
    return date.comments;
};

export const postComment = async (userId, dateId, comment) => {
    comment = helpers.checkComment(comment, "Comment");

    userId = helpers.checkUserId(userId, "User ID");
    dateId = helpers.checkId(dateId, "Date ID");

    const dateCollection = await dates();

    const date = await getDate(dateId);
    const user = await get(userId);

    let newComment = {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        comment: comment,
        time: new Date(),
    };

    const updateInfo = await dateCollection.updateOne(
        { _id: new ObjectId(dateId) },
        { $push: { comments: newComment }, $inc: { commentsCount: 1 } }
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
        throw "Could not add comment";

    return newComment;
};

export const deleteComment = async (userId, dateId, timeStamp) => {
    userId = helpers.checkUserId(userId, "User ID");
    dateId = helpers.checkId(dateId, "Date ID");

    const dateCollection = await dates();

     const date = await dateCollection.findOne({ _id: new ObjectId(dateId) });
     if (!date) throw "Date not found";

    //  console.log(date.comments);
    //  console.log(new Date(timeStamp));

     const comment = date.comments.find(
         (comment) => comment.time.toISOString() === timeStamp
     );
     if (!comment) throw "Comment not found";

     if (comment.userId.toString() !== userId)
         throw "User is not authorized to delete this comment";


    const updateInfo = await dateCollection.updateOne(
        { _id: new ObjectId(dateId) },
        { $pull: { comments: { time: new Date(timeStamp) } }, $inc: { commentsCount: -1 } }
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
        throw "Could not delete comment";

    return true;
};
