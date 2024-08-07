import { addUser, getUser, getUsers, updateUser, updateUserRole, deleteUser, getUserById } from "../controllers/user.js";
import express from "express";

const router = express.Router();

router.route("/")
  .post(addUser)
  .get(getUsers);

router.route("/:epicGamesId")
  .get(getUser)
  .put(updateUser)
  .patch(updateUserRole)
  .delete(deleteUser);

router.route("/id/:_id")
  .get(getUserById)

export default router;