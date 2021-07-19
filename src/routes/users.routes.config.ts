import UsersController from "../controller/users.controller";

const router = require("express").Router();

router
  .route("/Login")
  .post(UsersController.authenticateSchema, UsersController.authenticate);

router.route(`/`).post(UsersController.createUser);

export default router;
