import { Recipe, RecipeDocument } from "../model/recipeModel";
import jwt from "express-jwt";
import { secret } from "../../config.json";
import express, { Request, Response } from "express";
import RecipesService from "../service/recipes.service";

class RecipesController {
  async createRecipe(req: Request, res: Response): Promise<express.Response> {
    try {
      req.body.added_by = return_id(req);
      const recipeId = await RecipesService.create(req.body);
      return res.status(201).send({ id: recipeId });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }

  async indexRecipe(
    req: AuthorizedRequest,
    res: Response
  ): Promise<express.Response> {
    const recipes = await Recipe.find({});

    const id: String = return_id(req);

    const recipeMap: RecipeDocument[] = recipes.filter(
      (recipe) => recipe.added_by == id
    );

    return res.send(recipeMap);
  }

  async index_allRecipe(
    req: AuthorizedRequest,
    res: Response
  ): Promise<express.Response> {
    const recipes = await Recipe.find({});
    return res.send(recipes);
  }

  async findById_Recipe(
    req: Request,
    res: Response
  ): Promise<express.Response> {
    const id = req.params.recipe_id;

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({
        message: `The recipe with the given id: ${id} does not exist`,
      });
    }
    if (recipe.added_by != return_id(req)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.json({
      data: recipe,
    });
  }

  async updateRecipe(req: Request, res: Response): Promise<express.Response> {
    const id = req.params.recipe_id;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({
        message: `The recipe with the given id: ${id} does not exist`,
      });
    }
    if (recipe.added_by !== return_id(req)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const new_recipe = await RecipesService.update(id, req.body);
    return res.status(201).send(new_recipe);
  }

  async removeRecipe(req: Request, res: Response): Promise<express.Response> {
    const id = req.params.recipe_id;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({
        message: `The recipe with the given id: ${id} does not exist`,
      });
    }
    if (recipe.added_by !== return_id(req)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const messages = await RecipesService.remove(id);
    return res.status(201).send({ messages });
  }
}
export default new RecipesController();

interface AuthorizedRequest extends Request {
  user?: any;
}

function return_id(req: AuthorizedRequest) {
  jwt({ secret, algorithms: ["HS256"] });
  return req.user.id;
}
