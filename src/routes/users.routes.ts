import UsersController from "../controller/users.controller";
import {
  validateUserRegister,
  validateUserLogin,
} from "../validators/users.validator";
import { validate } from "../middleware/user.validation";

const router = require("express").Router();

/**
 * @swagger
 * /user/:
 *   post:
 *     tags:
 *       - user
 *     description: Account creation
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *           $ref: '#/definitions/User'
 *
 *     responses:
 *       201:
 *         description: id
 *         properties:
 *           id:
 *             type: string
 */

router
  .route(`/`)
  .post(validate(validateUserRegister), UsersController.createUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - user
 *     description: Sign in as customer or admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description:
 *         required: true
 *         in: body
 *         properties:
 *           first_name:
 *             type: string
 *           last_name:
 *              type: string
 *
 *     responses:
 *       200:
 *         description: An access token
 *         properties:
 *           token:
 *             type: string
 *           grantType:
 *             type: string
 *           refreshToken:
 *             type: string
 */

router
  .route("/login")
  .post(
    UsersController.authenticateSchema,
    validate(validateUserLogin),
    UsersController.authenticate
  );

export default router;

/**
 * @swagger
 * tags:
 * - name: user
 *   description: "create an account and login"
 * definitions:
 *   User:
 *     properties:
 *       first_name:
 *         type: string
 *       last_name:
 *          type: string
 *       login:
 *         type: string
 *       email:
 *          type: string
 *       password:
 *          type: string
 *       role:
 *         type: string
 *     # Both properties are required
 *     required:
 *       - id
 *       - first_name
 *       - last_name
 *       - login
 *       - email
 *       - password
 *       - role
 */
