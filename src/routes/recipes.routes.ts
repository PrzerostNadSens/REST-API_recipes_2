import express from 'express';
import Role from '../mongodb/role';
import { authorize } from '../mongodb/authorize';
import recipesController from '../controller/recipes.controller';
import { validateCreateRecipe, validateUpdateRecipe, validateMongoId } from '../validators/recipe.validate';
import { validate } from '../middleware/validate.middleware';
import { StrategyOptions, auth } from '../middleware/auth.middleware';

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

router.get('/', auth.authenticate([StrategyOptions.Bearer]), (req, res) => recipesController.getUserRecipes(req, res));

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

router.post('/', auth.authenticate([StrategyOptions.Bearer]), validate(validateCreateRecipe), (req, res) =>
  recipesController.createRecipe(req, res),
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

router.get('/all', auth.authenticate([StrategyOptions.Bearer]), authorize(Role.Admin as any), (req, res) =>
  recipesController.getAllRecipe(req, res),
);

/**
 * @swagger
 * /recipes/:recipeId:
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
 *         description: Validation error. See response body for details.
 *       401:
 *         description: Unauthorized. When the user is not logged in.
 *       403:
 *         description: Access forbidden. User is not authorized to access this resource.
 *       404:
 *         description: The recipe with the given id does not exist.
 */

router.get('/:recipeId', auth.authenticate([StrategyOptions.Bearer]), validate(validateMongoId), (req, res) =>
  recipesController.findByIdRecipe(req, res),
);

/**
 * @swagger
 * /recipes/:recipeId:
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
 *         description: Validation error. See response body for details.
 *       401:
 *         description: Unauthorized. When the user is not logged in.
 *       403:
 *         description: Access forbidden. User is not authorized to access this resource.
 *       404:
 *         description: The recipe with the given id does not exist.
 */

router.put(
  '/:recipeId',
  auth.authenticate([StrategyOptions.Bearer]),
  validate(validateUpdateRecipe),
  validate(validateMongoId),
  (req, res) => recipesController.updateRecipe(req, res),
);

/**
 * @swagger
 * /recipes/:recipeId:
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
 *         description: Recipe successfully removed.
 *       400:
 *         description: Validation error. See response body for details.
 *       401:
 *         description: Unauthorized. When the user is not logged in.
 *       403:
 *         description: Access forbidden. User is not authorized to access this resource.
 *       404:
 *         description: The recipe with the given id does not exist.
 */

router.delete('/:recipeId', auth.authenticate([StrategyOptions.Bearer]), validate(validateMongoId), (req, res) =>
  recipesController.removeByIdRecipe(req, res),
);

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
