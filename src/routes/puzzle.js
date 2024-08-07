import { getPuzzleById } from "../controllers/puzzle.js";
import express from "express";


const router = express.Router();

router.route("/:_id")
  .get(getPuzzleById);

export default router;