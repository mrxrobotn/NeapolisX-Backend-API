import { getArtefactById } from "../controllers/artefact.js";
import express from "express";


const router = express.Router();

router.route("/:_id")
  .get(getArtefactById);

export default router;