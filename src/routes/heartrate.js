import express from "express";
import { getHeartrateValue } from "../controllers/heartrate.js";

const router = express.Router();

router.route("/")
    .get(getHeartrateValue);

export default router;