import { getPuzzleById, getPuzzleIdByName } from "../controllers/puzzle.js";
import express from "express";


const router = express.Router();

router.route("/:_id")
  .get(getPuzzleById);

router.route("/name/:name")
  .get(getPuzzleIdByName);

export default router;