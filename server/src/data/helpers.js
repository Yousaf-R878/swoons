import { ObjectId } from "mongodb";
import * as EmailValidator from "email-validator";
import { getAuth } from "firebase-admin/auth";

export let checkString = (string, variableName) => {
  if (!string) {
    throw `${variableName} was not provided`;
  }
  if (!(typeof string === "string")) {
    throw `${variableName} is not a string`;
  }
  string = string.trim();
  if (string.length === 0) {
    throw `${variableName} cannot be an empty string`;
  }

  return string;
};

export let checkAlphanumeric = (string, variableName) => {
  let regex = /^[a-z0-9]+$/i; //Note to me: /i is for case-insensitive
  if (!regex.test(string)) {
    throw `${variableName} must be alphanumeric!`;
  }
  return string;
};

export let checkUsername = (username, variableName) => {
  username = checkString(username, variableName);
  if (username.length < 3 && username.length > 20) {
    throw `${variableName} must be between 3 and 20 characters long`;
  }
  let regex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z][a-zA-Z0-9._]+[a-zA-Z0-9]$/;
  if (!regex.test(username)) {
    throw `${variableName} must be alphanumeric and can only contain underscores and periods!`;
  }
  return username;
};

export let checkUserId = (id, variableName) => {
  id = checkString(id, variableName);
  const user = getAuth().getUser(id);
  if (!user) {
    throw `${variableName}: Invalid User Id`;
  }
  return id;
};

export let checkId = (id, variableName) => {
  id = checkString(id, variableName);
  if (!ObjectId.isValid(id)) {
    throw `${variableName}: Invalid Object Id`;
  }
  return id;
};

export let checkName = (name, variableName) => {
  name = checkString(name, variableName);
  if (name.length < 2) {
    throw `${variableName} must be at least two characters`;
  }
  if (name.length > 50) {
    throw `${variableName} must be 50 characters or less`;
  }
  let nameRegex = /^[a-zA-Z'-]+$/; //One word, hyphens and apostrophes
  //Maybe add check for repeat characters
  //https://ux.stackexchange.com/questions/55529/what-should-the-character-limits-for-first-last-name-inputs-be
  if (!nameRegex.test(name)) {
    throw `${variableName} can only contain letters, hyphens, and apostrophes`;
  }

  return name;
};

export let checkEmail = (email, variableName) => {
  email = checkString(email, variableName);
  if (!EmailValidator.validate(email)) {
    throw `${variableName} is not a valid email`;
  }

  return email;
};

export let checkLocationName = (name, variableName) => {
  name = checkString(name, variableName);
  if (name.length < 1) {
    throw `${variableName} must be at least one character long`;
  }
  if (name.length > 50) {
    throw `${variableName} must be less than 50 characters long`;
  }

  // const eventNameRegex = /^[a-zA-Z0-9\s'-]+$/;
  // if (!eventNameRegex.test(name)) {
  //     throw `${variableName} (${name}) must only contain letters, numbers, spaces, apostrophes, or hypens`;
  // }

  return name;
};

export let checkTitle = (title, variableName) => {
  // essentially the same thing as checkLocationName
  title = checkLocationName(title, variableName);
  return title;
};

export let checkComment = (comment, variableName) => {
  comment = checkString(comment, variableName);
  if (comment.length < 1) {
    throw `${variableName} must be at least one character long`;
  }
  if (comment.length > 500) {
    throw `${variableName} must be less than 500 characters long`;
  }

  return comment;
};

export let checkTag = (tag, variableName) => {
  tag = checkString(tag, variableName);
  if (tag.length < 1) {
    throw `${variableName} must be at least one character long`;
  }
  if (tag.length > 20) {
    throw `${variableName} must be less than 50 characters long`;
  }

  const tagRegex = /^[a-zA-Z0-9\s'-]+$/;
  if (!tagRegex.test(tag)) {
    throw `${variableName} (${tag}) must only contain letters, numbers, spaces, apostrophes, or hypens`;
  }

  return tag.toLowerCase();
};

export let checkTagArray = (tagArray, variableName) => {
  if (!Array.isArray(tagArray)) {
    throw `${variableName} must be an array`;
  }
  if (tagArray.length === 0) {
    throw `${variableName} must have at least one tag`;
  }
  for (let i = 0; i < tagArray.length; i++) {
    tagArray[i] = checkTag(tagArray[i], `${variableName}[${i}]`);
  }

  return tagArray;
};

export let checkEvent = (event, variableName) => {
  if (!event) {
    throw `${variableName} was not provided`;
  }
  if (!(typeof event === "object")) {
    throw `${variableName} is not an object`;
  }
  if (Object.keys(event).length === 0) {
    throw `${variableName} cannot be an empty object`;
  }
  if (!event.name) {
    throw `${variableName} must have a name`;
  }
  if (!event.location) {
    throw `${variableName} must have a location`;
  }

  event.name = checkLocationName(event.name, `${variableName}.name`);
  event.location = checkString(event.location, `${variableName}.location`);

  return event;
};

export let checkEventArray = (eventArray, variableName) => {
  if (!Array.isArray(eventArray)) {
    throw `${variableName} must be an array`;
  }
  if (eventArray.length === 0) {
    throw `${variableName} must have at least one event`;
  }
  for (let i = 0; i < eventArray.length; i++) {
    eventArray[i] = checkEvent(eventArray[i], `${variableName}[${i}]`);
  }

  return eventArray;
};
