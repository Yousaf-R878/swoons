import {Router} from 'express';
const router = Router();
import * as userFuncs from '../data/users.js'
import * as helpers from '../data/helpers.js'
import { users } from '../config/mongoCollections.js';

router
    .route('/')
    .get(async (req, res) => {
        try{
            let allUsers = await userFuncs.getAll();
            return res.status(200).json(allUsers)
        } catch (e){
            return res.status(500).json({error: e})
        }
    })

router
    .route('/signup')
    .post(async (req, res) => {
        let userInfo = req.body;
        if (!userInfo || Object.keys(userInfo).length === 0){
            return res.status(400).json({error: 'There are no fields in the request body'});
        }

        let firstName = userInfo.firstName;
        let lastName = userInfo.lastName;
        let email = userInfo.email;
        let password = userInfo.password;

        try{
            //VALIDATE FIELDS
            firstName = helpers.checkName(firstName, "First Name");
            lastName = helpers.checkName(lastName, "Last Name");
            email = helpers.checkEmail(email, "Email");
            password = helpers.checkPassword(password, "Password");

            const usersCollection = await users();
            let userExists = await usersCollection.findOne({email: email});
            if(userExists){
                throw `User with that email (${email}) already exists!`
            }

        } catch(e){
            return res.status(400).json({error: e});
        }

        try{
            let newUser = await userFuncs.create(firstName,lastName,email,password);
            return res.status(200).json(newUser);

        } catch(e){
            return res.status(500).json({error: e});
        }
    })

router
    .route('/:id')
    .get(async (req, res) => {
        let id = req.params.id;

        try{
            id = helpers.checkId(id, "ID");
        } catch (e){
            return res.status(400).json({error: e});
        }

        try{
            let user = await userFuncs.get(id);
            return res.status(200).json(user);

        } catch (e){
            if (e === `No User with that ID (${id})`){
                return res.status(404).json({error: e});
            } else{
                return res.status(500).json({error: e});
            }
        }
    })
    .patch(async (req, res) => {
        let userInfo = req.body;
        let id = req.params.id;

        try{
            id = helpers.checkId(id, "ID");
        } catch (e){
            return res.status(400).json({error: e});
        }

        const usersCollection = await users();
        let user;

        try{
            user = await userFuncs.get(id);
        } catch (e){
            return res.status(404).json({error: e})
        }

        if (!userInfo || Object.keys(userInfo).length === 0){
            return res.status(400).json({error: 'There are no fields in the request body'});
        }

        let firstName = userInfo.firstName;
        let lastName = userInfo.lastName;
        let email = userInfo.email;
        let password = userInfo.password;

        if (!firstName){
            firstName = user.firstName;
        }

        if (!lastName){
            lastName = user.lastName;
        }

        if (!email){
            email = user.email;
        }

        if (!password){
            password = user.password;
        }

        try{
            firstName = helpers.checkName(firstName, "First Name");
            lastName = helpers.checkName(lastName, "Last Name");
            email = helpers.checkEmail(email, "Email");
            password = helpers.checkPassword(password, "Password");

        } catch (e) {
            return res.status(400).json({error: e});
        }

        try {
            let updatedUser = await userFuncs.update(id,firstName,lastName,email,password);
            return res.status(200).json(updatedUser);
        } catch (e) {
            return res.status(500).json({error: e})
        }
    })


