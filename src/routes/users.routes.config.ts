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
 * /users/:
 *   post:
 *     tags:
 *       - user
 *     description: Account creation
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: All parameters are required and login, email and password must be unique.
 *         required: true
 *         in: body
 *         definitions:
 *           CatalogItem:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: "Rafal"
 *         schema:
 *           type: CatalogItem
 *
 *
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
 * /users/login:
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
 *         schema:
 *           type: "object"
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
router.route("/login").post(authenticateSchema, authenticate);

export default router;
