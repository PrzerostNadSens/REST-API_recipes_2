import { Recipe, OmitIRecipe } from "../model/recipeModel";
import { Request, Response } from "express";
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
    res: Response
  ): Promise<Response> {
    try {
      const userId = returnId(req);
      const filter: OmitIRecipe = req.query;
      const recipe = await RecipesService.get(userId, filter);

      return res.status(200).send(recipe);
    } catch (e) {
      return res.status(500).send(e.message);
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

  async findByIdRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.recipe_id;
      const userId = returnId(req);
      const recipe = await RecipesService.findById(id);

      if (!recipe) {
        return res.status(404).json({
          message: `The recipe with the given id: ${id} does not exist`,
        });
      }
      if (recipe.added_by != userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      return res.status(200).send(recipe);
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }

  async updateRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.recipe_id;
      const userId = returnId(req);
      const recipe = await Recipe.findById(id);

      if (!recipe) {
        return res.status(404).json({
          message: `The recipe with the given id: ${id} does not exist`,
        });
      }
      if (recipe.added_by != userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const newRecipe = await RecipesService.update(id, req.body);

      return res.status(201).send(newRecipe);
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }

  async removeByIdRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.recipe_id;
      const userId = returnId(req);
      const recipe = await Recipe.findById(id);

      if (!recipe) {
        return res.status(404).json({
          message: `The recipe with the given id: ${id} does not exist`,
        });
      }
      if (recipe.added_by != userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const message = await RecipesService.remove(id);

      return res.status(200).send({ message });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }
}
export default new RecipesController();
