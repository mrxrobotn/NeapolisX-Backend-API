import { addUser, getUserById, updateUserInfo, updateArtifactsData } from "../controllers/user.js";
import express from "express";

const router = express.Router();

router.route("/")
  .post(addUser)

router.route("/info/:tezWallet")
  .put(updateUserInfo);

router.route("/artefact/:tezWallet")
  .put(updateArtifactsData);

router.route("/id/:_id")
  .get(getUserById)

export default router;