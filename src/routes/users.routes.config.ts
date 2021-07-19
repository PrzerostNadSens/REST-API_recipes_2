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
 * /user/login:
 *   post:
 *     tags:
 *       - user
 *     description: Sign in as customer or admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: client_id
 *         description: id of the requesting client
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

router.route(`/`).post(UsersController.createUser);

export default router;
