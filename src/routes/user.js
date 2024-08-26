import {
  addUser,
  getUserById,
  updateUserInfo,
  updateSkippedArtefactsField,
  updateArtefactsArray,
  updatePuzzlesArray,
  checkTezWalletExists,
  getUserByWallet,
  updateSkippedPuzzlesField
} from "../controllers/user.js";
import express from "express";

const router = express.Router();

router.route("/")
  .post(addUser);

router.route("/check-wallet")
  .post(checkTezWalletExists);

router.route("/:tezWallet")
  .get(getUserByWallet);

router.route("/info/:tezWallet")
  .put(updateUserInfo);

router.route("/skip-artefacts/:tezWallet")
  .put(updateSkippedArtefactsField);

router.route("/artefacts/:tezWallet")
  .put(updateArtefactsArray);

router.route("/skip-puzzles/:tezWallet")
  .put(updateSkippedPuzzlesField);

router.route("/puzzles/:tezWallet")
  .put(updatePuzzlesArray);

router.route("/id/:_id")
  .get(getUserById);

export default router;
