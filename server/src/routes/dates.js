import { Router } from "express";
const router = Router();
import * as dateFuncts from "../data/dates.js"
import * as helpers from "../data/helpers.js";

//import api key from env file for trip advisor api
import dotenv from "dotenv";
console.log(dotenv.config({ path: "/Users/yousafrajput/Snoopers/client/.env" }));
//access api key called TRIP_ADVISOR_API_KEY
//get api key from env file
const apiKey = process.env.TRIP_ADVISOR_API_KEY;
router.route("/").get(async (req, res) => {
    try {
        const dateList = await dateFuncts.getAllDates();
        return res.status(200).json(dateList);
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

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

router.route("/").post(async (req, res) => {
    let title = req.body.title;
    try {
        title = helpers.checkString(title, "Title");
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

router.route("/api/:searchTerm").get(async (req, res) => {
    let searchTerm = req.params.searchTerm;
    try {
        searchTerm = helpers.checkString(searchTerm, "Search Term");
    } catch (e) {
        return res.status(400).json({ error: e });
    }

    try {
        console.log(apiKey)
        // const options = {
        //     method: 'GET',
        //     url: 'https://api.content.tripadvisor.com/api/v1/location/search?key=9A1E057F540C41068E7A2E086D9561AB&searchQuery=times&language=en',
        //     headers: {accept: 'application/json'}
        // };
        return res.status(200).json(dateList);
    } catch (e) {
        return res.status(404).json({ error: e });
    }
})


export default router;