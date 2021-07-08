let router = require("express").Router();
import Role from "./mongodb/role";
import authorize from "./mongodb/authorize";

var recipeController = require("./controller/recipeController");

router
  .route("/")
  .get(authorize(), recipeController.index)
  .post(authorize(), recipeController.new);
//router.route("/all").get(authorize(Role.Admin), recipeController.index_all);
router
  .route("/:recipe_id")
  .get(authorize(), recipeController.view)
  .put(authorize(), recipeController.update)
  .delete(authorize(), recipeController.delete);

export default router;
