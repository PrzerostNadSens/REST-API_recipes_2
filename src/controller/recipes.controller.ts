import { IRecipe, Recipe, OmitIRecipe } from '../model/recipe.model';
import { Request, Response } from 'express';
import { returnId, AuthorizedRequest } from '../mongodb/authorize';
import RecipesService from '../service/recipes.service';
import { matchedData } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

const badRequest = { message: `Bad Request` };
const unauthorized = { message: 'Unauthorized' };
const notFound = { message: `The recipe with the given id does not exist.` };

class RecipesController {
  async createRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const data = <IRecipe>matchedData(req);
      data.addedBy = returnId(req);
      const recipeId = await RecipesService.create(data);

      return res.status(StatusCodes.CREATED).send({ id: recipeId });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async getUserRecipes(req: AuthorizedRequest, res: Response): Promise<Response> {
    try {
      const userId = returnId(req);
      const filter: OmitIRecipe = req.query;
      const recipe = await RecipesService.get(userId, filter);

      return res.status(StatusCodes.OK).send(recipe);
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async getAllRecipe(req: AuthorizedRequest, res: Response): Promise<Response> {
    try {
      const filter: OmitIRecipe = req.query;
      const recipes = await RecipesService.getAll(filter);

      return res.send(recipes);
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: `${e.message}`,
      });
    }
  }

  async findByIdRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.recipeId;

      if (id.length != 24) {
        return res.status(StatusCodes.BAD_REQUEST).json(badRequest);
      }

      const userId = returnId(req);
      const recipe = await RecipesService.findById(id);

      if (!recipe) {
        return res.status(StatusCodes.NOT_FOUND).json(notFound);
      }
      if (recipe.addedBy !== userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json(unauthorized);
      }

      return res.status(StatusCodes.OK).send(recipe);
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: `${e.message}`,
      });
    }
  }

  async updateRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.recipeId;

      if (id.length != 24) {
        return res.status(StatusCodes.BAD_REQUEST).json(badRequest);
      }

      const userId = returnId(req);
      const recipe = await Recipe.findById(id);

      if (!recipe) {
        return res.status(StatusCodes.NOT_FOUND).json(notFound);
      }
      if (recipe.addedBy !== userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json(unauthorized);
      }
      const newRecipe = await RecipesService.update(id, req.body);

      return res.status(StatusCodes.OK).send(newRecipe);
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: `${e.message}`,
      });
    }
  }

  async removeByIdRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.recipeId;

      if (id.length != 24) {
        return res.status(StatusCodes.BAD_REQUEST).json(badRequest);
      }

      const userId = returnId(req);
      const recipe = await Recipe.findById(id);

      if (!recipe) {
        return res.status(StatusCodes.NOT_FOUND).json(notFound);
      }
      if (recipe.addedBy !== userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json(unauthorized);
      }
      const message = await RecipesService.remove(id);

      return res.status(StatusCodes.NO_CONTENT).send({ message });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: `${e.message}`,
      });
    }
  }
}
export default new RecipesController();
