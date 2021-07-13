import UsersController, {
  authenticate,
  authenticateSchema,
} from "../controller/users.controller";
import UsersMiddleware from "../middleware/users.middleware";
const router = require("express").Router();

router.route("/Login").post(authenticateSchema, authenticate);

router
  .route(`/`)
  .get(UsersController.listUsers)
  .post(
    UsersMiddleware.validateRequiredUserBodyFields,
    UsersMiddleware.validateSameEmailDoesntExist,
    UsersController.createUser
  );
router.param(`userId`, UsersMiddleware.extractUserId);
router
  .route(`/:userId`)
  .all(UsersMiddleware.validateUserExists)
  .get(UsersController.getUserById)
  .delete(UsersController.removeUser);

router.put(`/:userId`, [
  UsersMiddleware.validateRequiredUserBodyFields,
  UsersMiddleware.validateSameEmailBelongToSameUser,
  UsersController.put,
]);

export default router;
