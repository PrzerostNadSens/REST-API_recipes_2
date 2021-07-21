const router = require("express").Router();
import Role from "../mongodb/role";
import { authorize } from "../mongodb/authorize";
import RecipesController from "../controller/recipe.controller";

/**
 * @swagger
 * /recipe/:
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

router.route("/").get(authorize(), RecipesController.getUserRecipes);

/**
 * @swagger
 * /recipe/:
 *   post:
 *     tags:
 *       - recipe
 *     description: creating a cooking recipe
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: recipe
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

router.route("/").post(authorize(), RecipesController.createRecipe);

/**
 * @swagger
 * /recipe/all:
 *   get:
 *     tags:
 *       - recipe
 *     description: displaying all recipes available only for logged in administrator
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

router
  .route("/all")
  .get(authorize(Role.Admin as any), RecipesController.getAllRecipe);

/**
 * @swagger
 * /recipe/{id}:
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

router.route("/:recipe_id").get(authorize(), RecipesController.findByIdRecipe);

/**
 * @swagger
 * /recipe/{id}:
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
router.route("/:recipe_id").put(authorize(), RecipesController.updateRecipe);

/**
 * @swagger
 * /recipe/{id}:
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

router
  .route("/:recipe_id")
  .delete(authorize(), RecipesController.removeByIdRecipe);

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
 */
