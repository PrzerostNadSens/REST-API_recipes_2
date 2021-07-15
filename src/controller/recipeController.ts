import { Recipe, RecipeDocument } from "../model/recipeModel";
import jwt from "express-jwt";
import { secret } from "../../config.json";
import { Request, Response, NextFunction } from "express";
import RecipesService from "../service/recipes.service";

class RecipesController {
  async createRecipe(req: Request, res: Response): Promise<Response> {
    try {
      req.body.added_by = returnId(req);
      const recipeId = await RecipesService.create(req.body);
      return res.status(201).send({ id: recipeId });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }

  async indexRecipe(req: AuthorizedRequest, res: Response, next: NextFunction) {
    try {
      const userId = returnId(req);
      const recipe = await RecipesService.view(userId);
      return res.status(201).send(recipe);
    } catch (e) {
      next(e);
    }
  }

  async indexAllRecipe(
    req: AuthorizedRequest,
    res: Response
  ): Promise<Response> {
    try {
      const recipes = await Recipe.find({});
      return res.send(recipes);
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }

  async findByIdRecipe(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.recipe_id;
      const userId = returnId(req);
      const recipe = await RecipesService.viewById(id, userId);
      return res.status(201).send(recipe);
    } catch (e) {
      next(e);
    }
  }

  async updateRecipe(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.recipe_id;
      const userId = returnId(req);
      const new_recipe = await RecipesService.update(id, req.body, userId);
      return res.status(201).send(new_recipe);
    } catch (e) {
      next(e);
    }
  }

  async removeRecipe(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.recipe_id;
      const userId = returnId(req);
      const message = await RecipesService.remove(id, userId);
      return res.status(200).send({ message });
    } catch (e) {
      next(e);
    }
  }
}
export default new RecipesController();

interface AuthorizedRequest extends Request {
  user?: any;
}

function returnId(req: AuthorizedRequest) {
  jwt({ secret, algorithms: ["HS256"] });
  return req.user.id;
}
