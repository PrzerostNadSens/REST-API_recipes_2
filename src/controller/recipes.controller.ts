import { IRecipe, Recipe, OmitIRecipe } from '../model/recipe.model';
import { Request, Response } from 'express';
import { returnId, AuthorizedRequest } from '../mongodb/authorize';
import recipesService, { RecipesService } from '../service/recipes.service';
import webhooksService, { WebhookEvent, WebhooksService } from '../service/webhooks.service';
import { matchedData } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

const forbidden = { message: 'Forbidden' };
const notFound = { message: `The recipe with the given id does not exist.` };
const internalServerError = { message: 'Internal Server Error' };

class RecipesController {
  constructor(private readonly recipesService: RecipesService, private readonly webhooksService: WebhooksService) {}

  async createRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const data = <IRecipe>matchedData(req);
      data.addedBy = returnId(req);
      const recipeId = await recipesService.create(data);

      webhooksService.sendEvent(data.addedBy!, WebhookEvent.CreateRecipe, recipeId);

      return res.status(StatusCodes.CREATED).send({ id: recipeId });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(internalServerError);
    }
  }

  async getUserRecipes(req: AuthorizedRequest, res: Response): Promise<Response> {
    try {
      const userId = returnId(req);
      const filter: OmitIRecipe = req.query;
      const recipe = await recipesService.get(userId, filter);

      return res.status(StatusCodes.OK).send(recipe);
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(internalServerError);
    }
  }

  async getAllRecipe(req: AuthorizedRequest, res: Response): Promise<Response> {
    try {
      const filter: OmitIRecipe = req.query;
      const recipes = await recipesService.getAll(filter);

      return res.send(recipes);
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError);
    }
  }

  async findByIdRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.recipeId;
      const userId = returnId(req);
      const recipe = await recipesService.findById(id);

      if (!recipe) {
        return res.status(StatusCodes.NOT_FOUND).json(notFound);
      }
      if (recipe.addedBy !== userId) {
        return res.status(StatusCodes.FORBIDDEN).json(forbidden);
      }

      return res.status(StatusCodes.OK).send(recipe);
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError);
    }
  }

  async updateRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.recipeId;
      const userId = returnId(req);
      const recipe = await Recipe.findById(id);

      if (!recipe) {
        return res.status(StatusCodes.NOT_FOUND).json(notFound);
      }
      if (recipe.addedBy !== userId) {
        return res.status(StatusCodes.FORBIDDEN).json(forbidden);
      }
      const newRecipe = await recipesService.update(id, req.body);

      webhooksService.sendEvent(userId, WebhookEvent.UpdateRecipe, id);

      return res.status(StatusCodes.OK).send(newRecipe);
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError);
    }
  }

  async removeByIdRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.recipeId;
      const userId = returnId(req);
      const recipe = await Recipe.findById(id);

      if (!recipe) {
        return res.status(StatusCodes.NOT_FOUND).json(notFound);
      }
      if (recipe.addedBy !== userId) {
        return res.status(StatusCodes.FORBIDDEN).json(forbidden);
      }
      const message = await recipesService.remove(id);

      webhooksService.sendEvent(userId, WebhookEvent.RemoveRecipe, id);

      return res.status(StatusCodes.NO_CONTENT).send({ message });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError);
    }
  }
}

export default new RecipesController(recipesService, webhooksService);
