// Date:
// {
//   id:
//   title:
//   tags: []
//   events: [
//     {
//       id:
//       title:
//       location:
//       time:
//     },
//     ...
//   ]
//   likes:
//   comments: [
//     {
//       username:
//       comment:
//       time: (potentially)
//     },
//     ...
//   ]
//   summary:
// }

import * as helpers from './helpers.js'
import { dates } from '../config/mongoCollections.js'
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

export const getAllDates = async () => {
    const dateCollection = await dates();
    const dateList = await dateCollection.find({}).toArray();
    return dateList;
}

export const getDate = async (id) => {
    //TODO: VALIDATE ID

    const dateCollection = await dates();
    const date = await dateCollection.findOne({_id: new ObjectId(id)});
    if(!date) throw 'Date not found';
    return date;
}

export const createDate = async (title) => {
    //TODO: VALIDATE TITLE

    const dateCollection = await dates();
    const newDate = {
        title: title,
        tags: [],
        events: [],
        likes: 0,
        comments: [],
        summary: ""
    }
    const insertInfo = await dateCollection.insertOne(newDate);
    if(insertInfo.insertedCount === 0) throw 'Could not add date';
    const newId = insertInfo.insertedId;
    const date = await getDate(newId);
    return date;
}

export const deleteDate = async (id) => {
    const dateCollection = await dates();
    const date = await getDate(id);
    const deletionInfo = await dateCollection.removeOne({_id: new ObjectId(id)});
    if(deletionInfo.deletedCount === 0) throw 'Could not delete date';
    return date;

}

//TODO: CHANGE TO IMAGEURL ARRAY AND THEN UPDATE FRONTEND TO HAVE MULTIPLE IMAGES PER LOCATION

export const addEvent = async (
    dateId, 
    locId,
    name,
    description,
    locAddress, 
    locImgUrl,
    rating,
    ratingImgUrl,
    email,
    phone,
    website
    ) => {
    const newEvent = {
        _id: locId,
        name: name,
        description: description,
        location_address: locAddress,
        location_img_url: locImgUrl,
        rating: rating,
        rating_img_url: ratingImgUrl,
        email: email,
        phone: phone,
        website: website
    }
    const dateCollection = await dates();
    const updatedInfo = await dateCollection.updateOne(
        {_id: new ObjectId(dateId)},
        {$push: {events: newEvent}}, {returnDocument: 'after'}
    );
    if (updatedInfo.modifiedCount === 0) {
        throw 'Date not found or could not update date successfully';
    }
    return newEvent
}