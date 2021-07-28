import express from 'express';
import Role from '../mongodb/role';
import { authorize } from '../mongodb/authorize';
import RecipesController from '../controller/recipes.controller';
import { validateCreateRecipe } from '../validators/validate.middleware';
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
 *
 *     responses:
 *       200:
 *         description: Recipes
 *         properties:
 *           id:
 *             type: string
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
 */

router.get('/:recipeId', auth.authenticate([StrategyOptions.Bearer]), RecipesController.findByIdRecipe);

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
 *       201:
 *         description: Recipes
 *         properties:
 *           id:
 *             type: string
 */

router.put('/:recipeId', auth.authenticate([StrategyOptions.Bearer]), RecipesController.updateRecipe);

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
 *       200:
 *         description: Recipes
 *         properties:
 *           id:
 *             type: string
 */

router.delete('/:recipeId', auth.authenticate([StrategyOptions.Bearer]), RecipesController.removeByIdRecipe);

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
