import {
  addUser,
  getUserById,
  updateUserInfo,
  updateSkippedArtefactsField,
  updateArtefactsArray,
  updatePuzzlesArray,
  checkTezWalletExists,
  getUserByWallet,
  updateSkippedPuzzlesField,
  setReview,
  countArtefacts,
  countPuzzles,
  incrementCoins,
  getCoinsByWallet,
  setTimeSpent
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

router.route("/set-review")
  .put(setReview);

router.route("/count-artefacts/:tezWallet")
  .get(countArtefacts);

router.route("/count-puzzles/:tezWallet")
  .get(countPuzzles);

router.route("/increment-coins")
  .put(incrementCoins);

router.route("/coins/count")
  .get(getCoinsByWallet);  

router.route("/set-timespent")
  .put(setTimeSpent);

export default router;
