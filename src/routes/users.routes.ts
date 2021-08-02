import express, { NextFunction, Request, Response } from 'express';
import UsersController from '../controller/users.controller';
import { validateUserRegister } from '../validators/user.validate';
import { validate } from '../middleware/validate.middleware';
import { StrategyOptions, auth } from '../middleware/auth.middleware';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  if (!'POST'.includes(req.method)) {
    return res.status(StatusCodes.NOT_FOUND).json();
  }
  return next();
});

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
 *         description: "Required Admin or User in role.\nThe password must not be shorter than 8 characters.\nMust contain at least one character from each of the following groups: \nLowercase, \nUppercase, \nNumbers, \nSpecial signs.\n\nExample: Trudne.haslo1"
 *         schema:
 *           $ref: '#/definitions/User'
 *
 *     responses:
 *       201:
 *         description: id
 *         properties:
 *           id:
 *             type: string
 *       400:
 *         description: Bad Request. When validation errors.
 */

router.post('/', validate(validateUserRegister), UsersController.createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - user
 *     description: Sign in as customer or admin with Basic Auth
 *     produces:
 *       - application/json
 *     components:
 *       securitySchemes:
 *         basicAuth:
 *           type: http
 *           scheme: basic
 *     security:
 *       - basicAuth: []
 *
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
 *       401:
 *         description: Unauthorized. When the user provides incorrect login details.
 */

router.post('/login', auth.authenticate([StrategyOptions.Basic]), UsersController.generateToken);

export default router;

/**
 * @swagger
 * tags:
 * - name: user
 *   description: "create an account and login"
 * definitions:
 *   User:
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
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
 *       - firstName
 *       - lastName
 *       - login
 *       - email
 *       - password
 *       - role
 */
