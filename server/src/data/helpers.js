import {ObjectId} from 'mongodb';
import * as EmailValidator from 'email-validator';

export let checkString = (string, variableName) => {
    if (!string){
        throw `${variableName} was not provided`
    }
    if (!(typeof string === 'string')){
        throw `${variableName} is not a string`
    }
    string = string.trim()
    if (string.length === 0){
        throw `${variableName} cannot be an empty string`
    }

    return string;
}

export let checkAlphanumeric = (string, variableName) => {
    let regex = /^[a-z0-9]+$/i; //Note to me: /i is for case-insensitive
    if(!regex.test(string)){
        throw `${variableName} must be alphanumeric!`
    }
    return string;
}

export let checkId = (id, variableName) => {
    id = checkString(id, variableName);
    if (!ObjectId.isValid(id)){
        throw `${variableName}: Invalid Object Id`

    }
    return id;
}

export let checkName = (name, variableName) => {
    name = checkString(name, variableName);
    if (name.length < 2){
        throw `${variableName} must be at least two characters`
    }
    if (name.length > 50){
        throw `${variableName} must be 50 characters or less`
    }
    let nameRegex = /^[a-zA-Z'-]+$/; //One word, hyphens and apostrophes
    //Maybe add check for repeat characters
    //https://ux.stackexchange.com/questions/55529/what-should-the-character-limits-for-first-last-name-inputs-be
    if (!nameRegex.test(name)){
        throw `${variableName} can only contain letters, hyphens, and apostrophes`
    }

    return name.toLowerCase()
}

export let checkEmail = (email, variableName) => {
    email = checkString(email, variableName);
    if (!EmailValidator.validate(email)){
        throw `${variableName} is not a valid email`
    }

    return email;
}

export let checkPassword = (password, variableName) => {
    /*
    At least one uppercase, lowercase, number, and symbol
    At least 8 chars long
    Upper limit?
    */
    password = checkString(password, variableName);
    
    if (password.length < 8){
        throw `${variableName} must be at least eight characters long`
    }

    let uppercaseRegex = /[A-Z]/;
    if (!uppercaseRegex.test(password)){
        throw `${variableName} must contain at least one uppercase letter`
    }

    let lowercaseRegex = /[a-z]/;
    if (!lowercaseRegex.test(password)){
        throw `${variableName} must contain at least one lowercase letter`
    }

    let numberRegex = /\d/;
    if (!numberRegex.test(password)){
        throw `${variableName} must contain at least one number`

    }

    let symbolRegex = /[~`!@#$%^&*()_+\-={[}\]|:;"'<,>.?/]/;
    if (!symbolRegex.test(password)){
        throw `${variableName} must contain at least one symbol`
    }

    return password;
}