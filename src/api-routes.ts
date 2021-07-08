const router = require("express").Router();
import Role from "./mongodb/role";
import { authorize } from "./mongodb/authorize";

import * as recipeController from "./controller/recipeController";

router
  .route("/")
  .get(authorize(), recipeController.index)
  .post(authorize(), recipeController.create);
router
  .route("/all")
  .get(authorize(Role.Admin as any), recipeController.index_all);
router
  .route("/:recipe_id")
  .get(authorize(), recipeController.view)
  .put(authorize(), recipeController.update)
  .delete(authorize(), recipeController.remove);

export default router;
