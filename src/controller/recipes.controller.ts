import { IRecipe, Recipe, OmitIRecipe, RecipeDocument } from '../model/recipe.model';
import { Request, Response } from 'express';
import { returnId, AuthorizedRequest } from '../mongodb/authorize';
import RecipesService from '../service/recipes.service';
import { matchedData } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { calculateLimitAndOffset, paginate } from 'paginate-info';

const forbidden = { message: 'Forbidden' };
const notFound = { message: `The recipe with the given id does not exist.` };
const internalServerError = { message: 'Internal Server Error' };
class RecipesController {
  async createRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const data = <IRecipe>matchedData(req);
      data.addedBy = returnId(req);
      const recipeId = await RecipesService.create(data);

      return res.status(StatusCodes.CREATED).send({ id: recipeId });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(internalServerError);
    }
  }

  async getUserRecipes(req: AuthorizedRequest, res: Response): Promise<Response> {
    try {
      const userId = returnId(req);
      const filter: OmitIRecipe = req.query;
      const recipe = await RecipesService.get(userId, filter);

      return res.status(StatusCodes.OK).send(recipe);
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(internalServerError);
    }
  }

  async getAllRecipe(req: AuthorizedRequest, res: Response): Promise<Response> {
    try {
      const {
        query: { currentPage, pageSize },
      } = req;
      const totalElements = await Recipe.estimatedDocumentCount();
      const { limit, offset } = calculateLimitAndOffset(currentPage, pageSize);
      const filter: OmitIRecipe = req.query;
      const recipes = await RecipesService.getAll(filter, limit, offset);
      const meta = paginateInfo(currentPage, totalElements, recipes, pageSize);

      return res.send({ recipes, meta });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError);
    }
  }

  async findByIdRecipe(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.recipeId;
      const userId = returnId(req);
      const recipe = await RecipesService.findById(id);

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
      const newRecipe = await RecipesService.update(id, req.body);

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
      const message = await RecipesService.remove(id);

      return res.status(StatusCodes.NO_CONTENT).send({ message });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError);
    }
  }
}
export default new RecipesController();

function paginateInfo(page: any, totalElements: number, recipes: RecipeDocument[], size: any) {
  const { currentPage, pageCount, pageSize, count } = paginate(page, totalElements, recipes, size);
  let firstPage = false;
  let lastPage = false;
  if (currentPage == '1') {
    firstPage = true;
  }
  if (currentPage == pageCount) {
    lastPage = true;
  }
  const info = { currentPage, pageCount, pageSize, count, firstPage, lastPage };
  return info;
}
