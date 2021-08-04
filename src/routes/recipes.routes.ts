import express, { NextFunction, Request, Response } from 'express';
import Role from '../mongodb/role';
import { authorize } from '../mongodb/authorize';
import RecipesController from '../controller/recipes.controller';
import { validateCreateRecipe, validateUpdateRecipe, validateMongoId } from '../validators/recipe.validate';
import { validate } from '../middleware/validate.middleware';
import { StrategyOptions, auth } from '../middleware/auth.middleware';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

/**
 * @swagger
 * /recipes/:
 *   get:
 *     tags:
 *       - recipe
 *     description: displays recipes belonging to the user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by name.
 *         example: "CIASTECZKA Z NUTELLĄ"
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by type.
 *         example: "Obiad"
 *
 *     responses:
 *       200:
 *         description: Recipes
 *         properties:
 *           id:
 *             type: string
 *       401:
 *         description: Unauthorized. When the user is not logged in.
 */

router.get('/', auth.authenticate([StrategyOptions.Bearer]), RecipesController.getUserRecipes);

/**
 * @swagger
 * /recipes/:
 *   post:
 *     tags:
 *       - recipe
 *     description: creating a cooking recipe
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: recipe
 *         description: Required URL in photo.
 *         schema:
 *           $ref: '#/definitions/Recipe'
 *
 *     responses:
 *       201:
 *         description: Recipes
 *         properties:
 *           id:
 *             type: string
 *       400:
 *         description: Bad Request. For example, validation errors.
 *       401:
 *         description: Unauthorized. When the user is not logged in.
 *
 */

router.post(
  '/',
  auth.authenticate([StrategyOptions.Bearer]),
  validate(validateCreateRecipe),
  RecipesController.createRecipe,
);

/**
 * @swagger
 * /recipes/all:
 *   get:
 *     tags:
 *       - recipe
 *     description: displaying all recipes available only for logged in administrator
 *     produces:
 *       - application/jsons
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by name.
 *         example: "CIASTECZKA Z NUTELLĄ"
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by type.
 *         example: "Obiad"
 *       - in: query
 *         name: currentPage
 *         schema:
 *           type: int
 *         description: Page counting starts with 1.
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: int
 *         description: How many recipes to display.
 *         example: 5
 *
 *     responses:
 *       200:
 *         description: Recipes
 *         properties:
 *           id:
 *             type: string
 *       401:
 *         description: Unauthorized. When the user is not logged in.
 *       403:
 *         description: When a user without administrator rights tries to use this endpoint.
 */

router.get(
  '/all',
  auth.authenticate([StrategyOptions.Bearer]),
  authorize(Role.Admin as any),
  RecipesController.getAllRecipe,
);

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     tags:
 *       - recipe
 *     description: display recipe belonging to the user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Recipes
 *         properties:
 *           id:
 *             type: string
 *       400:
 *         description: Bad Request. For example, giving an id of wrong origin.
 *       401:
 *         description: Unauthorized. When the user is not logged in.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: The recipe with the given id does not exist.
 */

router.get(
  '/:recipeId',
  auth.authenticate([StrategyOptions.Bearer]),
  validate(validateMongoId),
  RecipesController.findByIdRecipe,
);

/**
 * @swagger
 * /recipes/{id}:
 *   put:
 *     tags:
 *       - recipe
 *     description: update recipe belonging to the user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: recipe
 *         description: Required URL in photo.
 *         schema:
 *           $ref: '#/definitions/Recipe'
 *
 *     responses:
 *       200:
 *         description: Recipes
 *         properties:
 *           id:
 *             type: string
 *       400:
 *         description: Bad Request. For example, giving an id of wrong origin or validation errors.
 *       401:
 *         description: Unauthorized. When the user is not logged in.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: The recipe with the given id does not exist.
 */

router.put(
  '/:recipeId',
  auth.authenticate([StrategyOptions.Bearer]),
  validate(validateUpdateRecipe),
  validate(validateMongoId),
  RecipesController.updateRecipe,
);

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     tags:
 *       - recipe
 *     description: removes recipe belonging to the user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       204:
 *         description: Recipes
 *         properties:
 *           id:
 *             type: string
 *       400:
 *         description: Bad Request. For example, giving an id of wrong origin.
 *       401:
 *         description: Unauthorized. When the user is not logged in.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: The recipe with the given id does not exist.
 */

router.delete(
  '/:recipeId',
  auth.authenticate([StrategyOptions.Bearer]),
  validate(validateMongoId),
  RecipesController.removeByIdRecipe,
);

router.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (!'GET'.includes(req.method)) {
    return res.status(StatusCodes.NOT_FOUND).json();
  }
  return next();
});

export default router;

/**
 * @swagger
 * tags:
 * - name: recipe
 *   description: "handling of cooking recipes"
 * definitions:
 *   Recipe:
 *     properties:
 *       name:
 *         type: string
 *       type:
 *          type: string
 *       photo:
 *         type: string
 *       recipe:
 *          type: string
 *     # Both properties are required
 *     required:
 *       - id
 *       - name
 *       - recipe
 */
