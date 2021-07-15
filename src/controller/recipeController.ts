import { Recipe, RecipeDocument } from "../model/recipeModel";
import jwt from "express-jwt";
import { secret } from "../../config.json";
import express, { Request, Response, NextFunction } from "express";
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

  async indexRecipe(req: AuthorizedRequest, res: Response): Promise<Response> {
    const recipes = await Recipe.find({});

    const id: String = returnId(req);

    const recipeMap: RecipeDocument[] = recipes.filter(
      (recipe) => recipe.added_by == id
    );

    return res.send(recipeMap);
  }

  async indexAllRecipe(
    req: AuthorizedRequest,
    res: Response
  ): Promise<Response> {
    const recipes = await Recipe.find({});
    return res.send(recipes);
  }

  async findByIdRecipe(req: Request, res: Response): Promise<Response> {
    const id = req.params.recipe_id;

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({
        message: `The recipe with the given id: ${id} does not exist`,
      });
    }
    if (recipe.added_by != returnId(req)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.json({
      data: recipe,
    });
  }

  async updateRecipe(req: Request, res: Response): Promise<Response> {
    const id = req.params.recipe_id;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({
        message: `The recipe with the given id: ${id} does not exist`,
      });
    }
    if (recipe.added_by !== returnId(req)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const new_recipe = await RecipesService.update(id, req.body);
    return res.status(200).send(new_recipe);
  }

  async removeRecipe(req: Request, res: Response, next: NextFunction) {
    const id = req.params.recipe_id;
    const userId = returnId(req);
    const message = await RecipesService.remove(id, userId);
    next(message);
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
