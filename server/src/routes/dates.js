import { Router } from "express";
const router = Router();
import * as dateFuncts from "../data/dates.js"
import * as helpers from "../data/helpers.js";
import { dirname } from "path";
import path from "path"
import { fileURLToPath } from "url";
import axios from "axios";

//import api key from env file for trip advisor api
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, "../../../client/.env") });

const apiKey = process.env.TRIP_ADVISOR_API_KEY;

//ROUTE TO GET ALL DATES
router.route("/").get(async (req, res) => {
    try {
        const dateList = await dateFuncts.getAllDates();
        return res.status(200).json(dateList);
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

//ROUTE TO GET DATE BY ID
router.route("/:id").get(async (req, res) => {
    let id = req.params.id;
    try {
        id = helpers.checkId(id, "ID");
    } catch (e) {
        return res.status(400).json({ error: e });
    }

    try {
        const date = await dateFuncts.getDate(id);
        return res.status(200).json(date);
    } catch (e) {
        return res.status(404).json({ error: e });
    }
});

//ROUTE TO CREATE A NEW DATE
router.route("/").post(async (req, res) => {
    let title = req.body.title;
    try {
        title = helpers.checkTitle(title, "Title");
    } catch (e) {
        return res.status(400).json({ error: e });
    }

    try {
        const newDate = await dateFuncts.createDate(title);
        return res.status(200).json(newDate);
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

//ROUTE FOR DELETING DATE BY ID
router.route("/:id").delete(async (req, res) => {
    let id = req.params.id;
    try {
        id = helpers.checkId(id, "ID");
    } catch (e) {
        return res.status(400).json({ error: e });
    }

    try {
        let deletedDate = await dateFuncts.deleteDate(id);
        return res.status(200).json(deletedDate);
    } catch (e) {
        return res.status(404).json({ error: e });
    }
});

//ROUTE FOR SEARCHING FOR LOCATIONS
router.route("/api/:searchTerm").get(async (req, res) => {
    let searchTerm = req.params.searchTerm;
    try {
        searchTerm = helpers.checkString(searchTerm, "Search Term");
    } catch (e) {
        return res.status(400).json({ error: e });
    }

    try {
        console.log("here")
        let data;
        const options = {
            method: 'GET',
            url: `https://api.content.tripadvisor.com/api/v1/location/search?key=${apiKey}&searchQuery=${searchTerm}&language=en`,
            headers: {accept: 'application/json'}
        };

        await axios
        .request(options)
        .then(function (response) {
            //TODO: CHANGE THIS LATER WHEN USING FRONTEND SO THAT WE GET MORE LOCS
            data = response.data.data;
        }).catch(function (error) {
            return res.status(error.code).json({message: error.message});
        });
        data = data.splice(0,1)

        for(let i = 0; i < data.length; i++){
            let locPhotos = await axios.get(`https://api.content.tripadvisor.com/api/v1/location/${data[i].location_id}/photos?language=en&key=${apiKey}`)
            data[i]["imageUrl"] = locPhotos.data.data[0].images.medium.url
            //TODO: ADD SOME LOGIC IF NO PHOTOS
        }
        return res.status(200).json(data);
    } catch (e) {
        return res.status(404).json({ error: e });
    }
})

//ROUTE FOR ADDING AN EVENT
router.route("/:id").patch(async (req, res) => {
    let id = req.params.id;
    let locId = req.body.locId;
    let name = req.body.name;
    let description = req.body.description;
    let locAddress = req.body.locAddress;
    let locImgUrl = req.body.locImgUrl;
    let rating = req.body.rating;
    let ratingImgUrl = req.body.ratingImgUrl;
    let email = req.body.email;
    let phone = req.body.phone;
    let website = req.body.website;

    try {
        id = helpers.checkId(id, "ID");
    } catch (e) {
        return res.status(400).json({ error: e });
    }

    try {
        let newEvent = await dateFuncts.addEvent(
            id,
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
        );
        return res.status(200).json(newEvent);
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

//ROUTE FOR REMOVING AN EVENT
router.route("/:id/:locId").delete(async (req, res) => {
    let id = req.params.id;
    let locId = req.params.locId;

    try {
        id = helpers.checkId(id, "ID");
    } catch (e) {
        return res.status(400).json({ error: e });
    }

    try {
        let deletedEvent = await dateFuncts.removeEvent(id, locId);
        return res.status(200).json(deletedEvent);
    } catch (e) {
        return res.status(404).json({ error: e });
    }
});

export default router;