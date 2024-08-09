import { addUser, getUserById, updateUserInfo, updateArtifactsData, updateMinigamesData, checkTezWalletExists, getUserByWallet } from "../controllers/user.js";
import express from "express";

const router = express.Router();

router.route("/")
  .post(addUser)
  .get(checkTezWalletExists);
  
router.route("/:tezWallet")
  .get(getUserByWallet);

router.route("/info/:tezWallet")
  .put(updateUserInfo);

router.route("/artefact/:tezWallet")
  .put(updateArtifactsData);

router.route("/puzzle/:tezWallet")
  .put(updateMinigamesData);

router.route("/id/:_id")
  .get(getUserById)

export default router;