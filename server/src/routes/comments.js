import { Router } from "express";
const router = Router();
import * as dateFuncts from "../data/dates.js";
import * as commentFuncts from "../data/comments.js";
import * as helpers from "../data/helpers.js";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import security from "../middlewares/security.js";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../../client/.env") });

router.route("/:userId/:dateId").post(async (req, res) => {
    try {
        const userId = req.params.userId;
        const dateId = req.params.dateId;
        const comment = req.body.comment;
        // console.log("comment", comment)

        const newComment = await commentFuncts.postComment(
            userId,
            dateId,
            comment
        );

        return res.status(200).json(newComment);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e });
    }
});

router.route("/:userId/:dateId/:timeStamp").delete(async (req, res) => {
    try {
        const userId = req.params.userId;
        const dateId = req.params.dateId;
        const timeStamp = req.params.timeStamp;

        const deletedComment = await commentFuncts.deleteComment(
            userId,
            dateId,
            timeStamp
        );

        return res.status(200).json(deletedComment);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e });
    }
});

export default router;
