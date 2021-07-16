import UsersController, {
  authenticate,
  authenticateSchema,
} from "../controller/users.controller";

const router = require("express").Router();

router.route("/Login").post(authenticateSchema, authenticate);

router.route(`/`).post(UsersController.createUser);

export default router;
