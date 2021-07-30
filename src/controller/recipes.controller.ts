import { IRecipe, Recipe, OmitIRecipe } from '../model/recipe.model';
import { Request, Response } from 'express';
import { returnId, AuthorizedRequest } from '../mongodb/authorize';
import RecipesService from '../service/recipes.service';
import { matchedData } from 'express-validator';

class RecipesController {
  async createRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const data = <IRecipe>matchedData(req);
      data.addedBy = returnId(req);
      const recipeId = await RecipesService.create(data);

      return res.status(201).send({ id: recipeId });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }

  async getUserRecipes(req: AuthorizedRequest, res: Response): Promise<Response> {
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
      const filter: OmitIRecipe = req.query;
      const recipes = await RecipesService.getAll(filter);

      return res.send(recipes);
    } catch (e) {
      return res.status(500).json({
        message: `${e.message}`,
      });
    }
  }

  async findByIdRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.recipeId;

      if (id.length != 24) {
        return res.status(400).json({
          message: `Bad Request`,
        });
      }

      const userId = returnId(req);
      const recipe = await RecipesService.findById(id);

      if (!recipe) {
        return res.status(404).json({
          message: `The recipe with the given id: ${id} does not exist.`,
        });
      }
      if (recipe.addedBy !== userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      return res.status(200).send(recipe);
    } catch (e) {
      return res.status(500).json({
        message: `${e.message}`,
      });
    }
  }

  async updateRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.recipeId;

      if (id.length != 24) {
        return res.status(400).json({
          message: `Bad Request`,
        });
      }

      const userId = returnId(req);
      const recipe = await Recipe.findById(id);

      if (!recipe) {
        return res.status(404).json({
          message: `The recipe with the given id: ${id} does not exist.`,
        });
      }
      if (recipe.addedBy !== userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const newRecipe = await RecipesService.update(id, req.body);

      return res.status(200).send(newRecipe);
    } catch (e) {
      return res.status(500).json({
        message: `${e.message}`,
      });
    }
  }

  async removeByIdRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.recipeId;

      if (id.length != 24) {
        return res.status(400).json({
          message: `Bad Request`,
        });
      }

      const userId = returnId(req);
      const recipe = await Recipe.findById(id);

      if (!recipe) {
        return res.status(404).json({
          message: `The recipe with the given id: ${id} does not exist.`,
        });
      }
      if (recipe.addedBy !== userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const message = await RecipesService.remove(id);

      return res.status(204).send({ message });
    } catch (e) {
      return res.status(500).json({
        message: `${e.message}`,
      });
    }
  }
}
export default new RecipesController();
