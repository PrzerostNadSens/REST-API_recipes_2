import { Recipe } from "../model/recipeModel";
import { Request, Response, NextFunction } from "express";
import { returnId, AuthorizedRequest } from "../mongodb/authorize";
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

  async getUserRecipes(
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = returnId(req);
      const recipe = await RecipesService.get(userId);
      return res.status(200).send(recipe);
    } catch (e) {
      next(e);
    }
  }

  async getAllRecipe(req: AuthorizedRequest, res: Response): Promise<Response> {
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
      const recipe = await RecipesService.findById(id, userId);
      return res.status(200).send(recipe);
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

  async removeByIdRecipe(req: Request, res: Response, next: NextFunction) {
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
