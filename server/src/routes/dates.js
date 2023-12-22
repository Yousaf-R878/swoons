import { Router } from "express";
const router = Router();
import * as dateFuncts from "../data/dates.js";
import * as helpers from "../data/helpers.js";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

//import api key from env file for trip advisor api
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../../client/.env") });

const apiKey = process.env.TRIP_ADVISOR_API_KEY;

// get dates
router.route("/").get(async (req, res) => {
    try {
        const tags = req.query.tags ? req.query.tags.split(",") : [];
        const sorting = req.query.sorting || "disabled";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;

        const { dates, totalPages } = await dateFuncts.getAllDates(
            tags,
            sorting,
            page,
            limit
        );

        return res.status(200).json({
            dates: dates,
            totalPages: totalPages,
            currentPage: page,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e });
    }
});

router.get("/liked", async (req, res) => {
    try {
        const userId = req.query.user;
        // console.log("Fetching dates for user:", userId);
        const dates = await dateFuncts.getLikedDatesbyUserId(userId);

        return res.status(200).json(dates);
    } catch (e) {
        // console.error("Server error while fetching dates:", e);
        return res.status(500).json({ error: "Server error" });
    }
});

router.get("/user", async (req, res) => {
    try {
        const userId = req.query.user;
        // console.log("Fetching dates for user:", userId);
        const dates = await dateFuncts.getCreatedDatesbyUserId(userId);
        return res.status(200).json(dates);
    } catch (e) {
        // console.error("Server error while fetching dates:", e);
        return res.status(500).json({ error: "Server error" });
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

async function populateEventWithTripAdvisorData(event) {
    try {
        let locPhotos = await axios.get(
            `https://api.content.tripadvisor.com/api/v1/location/${event.tripAdvisorLocationId}/photos?language=en&key=${apiKey}`
        );
        locPhotos.data.data = locPhotos.data.data.splice(0, 3);
        event.tripAdvisorLocationImages = locPhotos.data.data.map(
            (photo) => photo.images.medium.url
        );

        let locInfo = await axios.get(
            `https://api.content.tripadvisor.com/api/v1/location/${event.tripAdvisorLocationId}/details?key=${apiKey}`
        );
        event.tripAdvisorLocationUrl = locInfo.data.web_url;
        event.tripAdvisorLocationRating = locInfo.data.rating;
        event.tripAdvisorLocationRatingImage = locInfo.data.rating_image_url;
    } catch (error) {
        console.error(error);
        event.tripAdvisorLocationImages = [];
        event.tripAdvisorLocationUrl = "";
        event.tripAdvisorLocationRating = "";
        event.tripAdvisorLocationRatingImage = "";
    }
    return event;
}

function isNewOrUpdatedEvent(event) {
    return event && !event._id;
}

//ROUTE TO CREATE A NEW DATE
router.route("/").post(async (req, res) => {
    let title = req.body.title;
    let tagArray = req.body.tags;
    let eventArray = req.body.events;
    let userId = req.body.userId;
    try {
        title = helpers.checkTitle(title, "Title");
        tagArray = helpers.checkTagArray(tagArray, "Tag Array");
        eventArray = helpers.checkEventArray(eventArray, "Event Array");
        userId = helpers.checkUserId(userId, "User ID");
    } catch (e) {
        return res.status(400).json({ error: e });
    }

   try {
       for (let i = 0; i < eventArray.length; i++) {
           eventArray[i] = await populateEventWithTripAdvisorData(
               eventArray[i]
           );
       }

       const newDate = await dateFuncts.createDate(
           title,
           tagArray,
           eventArray,
           userId
       );
       return res.status(200).json(newDate);
   } catch (e) {
       return res.status(500).json({ error: e });
   }
});

//ROUTE FOR DELETING DATE BY ID
router.route("/:userId/:dateId").delete(async (req, res) => {
    let userId = req.params.userId;
    let dateId = req.params.dateId;
    try {
        dateId = helpers.checkId(dateId, "Date ID");
        userId = helpers.checkUserId(userId, "User ID");
    } catch (e) {
        return res.status(400).json({ error: e });
    }

    try {
        let deletedDate = await dateFuncts.deleteDate(dateId, userId);
        return res.status(200).json(deletedDate);
    } catch (e) {
        return res.status(404).json({ error: e });
    }
});

// Your PATCH route in the router file
router.patch("/:userId/:dateId", async (req, res) => {
    try {
        const dateId = req.params.dateId;
        const userId = req.params.userId;
        let { title, tags, events } = req.body;

        const currentDate = await dateFuncts.getDate(dateId);

        for (let i = 0; i < events.length; i++) {
            if (isNewOrUpdatedEvent(events[i])) {
                events[i] = await populateEventWithTripAdvisorData(events[i]);
            }
        }

        const updatedDate = await dateFuncts.editDate(userId, dateId, { title, tags, events });
        res.status(200).json(updatedDate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
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
        // console.log("here");
        let data;
        const options = {
            method: "GET",
            url: `https://api.content.tripadvisor.com/api/v1/location/search?key=${apiKey}&searchQuery=${searchTerm}&language=en`,
            headers: { accept: "application/json" },
        };

        await axios
            .request(options)
            .then(function (response) {
                //TODO: CHANGE THIS LATER WHEN USING FRONTEND SO THAT WE GET MORE LOCS
                data = response.data.data;
            })
            .catch(function (error) {
                return res.status(error.code).json({ message: error.message });
            });
        data = data.splice(0, 5);
        for (let loc of data) {
            loc["location"] = loc.address_obj.address_string;
            loc["tripAdvisorLocationId"] = loc.location_id;
            delete loc.address_obj;
            delete loc.location_id;
            // console.log(loc);
        }
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(404).json({ error: e });
    }
});

//ROUTE FOR REMOVING AN EVENT
router.route("/:id/:locId").delete(async (req, res) => {
    let id = req.params.id;
    let locId = req.params.locId;

    try {
        id = helpers.checkus(id, "ID");
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
