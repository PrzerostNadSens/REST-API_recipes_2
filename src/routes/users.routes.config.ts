import UsersController from "../controller/users.controller";

const router = require("express").Router();

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
 *         properties:
 *           first_name:
 *             type: string
 *           subname:
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
  .post(UsersController.authenticateSchema, UsersController.authenticate);

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
 *       subname:
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
 *       - name
 */
