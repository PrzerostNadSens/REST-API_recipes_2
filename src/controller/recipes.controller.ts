import { IRecipe, Recipe, OmitIRecipe } from '../model/recipe.model';
import { Request, Response } from 'express';
import { returnId, AuthorizedRequest } from '../mongodb/authorize';
import recipesService, { RecipesService } from '../service/recipes.service';
import webhooksService, { WebhookEvent, WebhooksService } from '../service/webhooks.service';
import { matchedData } from 'express-validator';
import responses from '../exceptions/exceptions';

class RecipesController {
  constructor(private readonly recipesService: RecipesService, private readonly webhooksService: WebhooksService) {}

  async createRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const data = <IRecipe>matchedData(req);
      data.addedBy = returnId(req);
      const recipeId = await recipesService.create(data);

      webhooksService.sendEvent(data.addedBy!, WebhookEvent.CreateRecipe, recipeId);

      return responses.sendCreatedWithId(res, recipeId);
    } catch (e) {
      return responses.sendInternalServerErrorResponse(res);
    }
  }

  async getUserRecipes(req: AuthorizedRequest, res: Response): Promise<Response> {
    try {
      const userId = returnId(req);
      const filter: OmitIRecipe = req.query;
      const recipes = await recipesService.get(userId, filter);

      return responses.sendOkWithRecipes(res, recipes);
    } catch (e) {
      return responses.sendInternalServerErrorResponse(res);
    }
  }

  async getAllRecipe(req: AuthorizedRequest, res: Response): Promise<Response> {
    try {
      const filter: OmitIRecipe = req.query;
      const recipes = await recipesService.getAll(filter);

      return res.send(recipes);
    } catch (e) {
      return responses.sendInternalServerErrorResponse(res);
    }
  }

  async findByIdRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.recipeId;
      const userId = returnId(req);
      const recipe = await recipesService.findById(id);

      if (!recipe) {
        return responses.notFound(res);
      }
      if (recipe.addedBy !== userId) {
        return responses.forbidden(res);
      }

      return responses.sendOkWithRecipe(res, recipe);
    } catch (e) {
      return responses.sendInternalServerErrorResponse(res);
    }
  }

  async updateRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.recipeId;
      const userId = returnId(req);
      const recipe = await Recipe.findById(id);

      if (!recipe) {
        return responses.notFound(res);
      }
      if (recipe.addedBy !== userId) {
        return responses.forbidden(res);
      }
      const newRecipe = await recipesService.update(id, req.body);

      webhooksService.sendEvent(userId, WebhookEvent.UpdateRecipe, id);

      return responses.sendOkWithRecipe(res, newRecipe);
    } catch (e) {
      return responses.sendInternalServerErrorResponse(res);
    }
  }

  async removeByIdRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.recipeId;
      const userId = returnId(req);
      const recipe = await Recipe.findById(id);

      if (!recipe) {
        return responses.notFound(res);
      }
      if (recipe.addedBy !== userId) {
        return responses.forbidden(res);
      }
      const message = await recipesService.remove(id);

      webhooksService.sendEvent(userId, WebhookEvent.RemoveRecipe, id);

      return responses.sendNoContent(res);
    } catch (e) {
      return responses.sendInternalServerErrorResponse(res);
    }
  }
}

export default new RecipesController(recipesService, webhooksService);
