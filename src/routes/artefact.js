import { getArtefactById, getArtefactIdByName, getArtefacts } from "../controllers/artefact.js";
import express from "express";


const router = express.Router();

router.route("/:_id")
  .get(getArtefactById);

router.route("/")
  .get(getArtefacts);

router.route("/name/:name")
  .get(getArtefactIdByName); 

export default router;