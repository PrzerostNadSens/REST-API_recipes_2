const router = require("express").Router();
import Role from "../mongodb/role";
import { authorize } from "../mongodb/authorize";
import RecipesController from "../controller/recipeController";
router
  .route("/")
  .get(authorize(), RecipesController.indexRecipe)
  .post(authorize(), RecipesController.createRecipe);
router
  .route("/all")
  .get(authorize(Role.Admin as any), RecipesController.indexAllRecipe);
router
  .route("/:recipe_id")
  .get(authorize(), RecipesController.findByIdRecipe)
  .put(authorize(), RecipesController.updateRecipe)
  .delete(authorize(), RecipesController.removeRecipe);

export default router;
