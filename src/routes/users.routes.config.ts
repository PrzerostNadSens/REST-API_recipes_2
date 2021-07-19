import UsersController, {
  authenticate,
  authenticateSchema,
} from "../controller/users.controller";

const router = require("express").Router();

/**
 * @swagger
 * tags:
 * - name: user
 *   description: "create an account and login"
 * securityDefinitions:
 *   basicAuth:
 *     type: basic
 *   bearerAuth:
 *     name: Authorization
 *     type: apiKey
 *     in: header
 *   innerAuth:
 *     name: Authorization
 *     type: apiKey
 *     in: header
 */
/**
 * @swagger
 * /user/:
 *   post:
 *     tags:
 *       - user
 *     description: account creation
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: first_name
 *         description: name of user
 *         required: true
 *         in: query
 *         schema:
 *           type: string
 *       - name: subname
 *         description: subname of user
 *         required: true
 *         in: query
 *         schema:
 *           type: string
 *       - name: login
 *         description: unique user login
 *         required: true
 *         in: query
 *         schema:
 *           type: string
 *       - name: email
 *         description: unique user email
 *         required: true
 *         in: query
 *         schema:
 *           type: string
 *       - name: password
 *         description: unique user password
 *         required: true
 *         in: query
 *         schema:
 *           type: string
 *       - name: role
 *         description: the user can take the role of "User" or "Admin"
 *         required: true
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: id
 *         properties:
 *           id:
 *             type: string
 */
router.route(`/`).post(UsersController.createUser);
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
 *       - name: login
 *         description: unique user login
 *         required: true
 *         in: query
 *         schema:
 *           type: string
 *       - name: password
 *         description: unique user password
 *         required: true
 *         in: query
 *         schema:
 *           type: string
 *     security:
 *       - basicAuth: []
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
router.route("/login").post(authenticateSchema, authenticate);

export default router;
