import RecipesDao from '../daos/recipes.dao';
import { IRecipe, PartialIRecipe, OmitIRecipe, ExcludeIRecipe, RecipeDocument } from '../model/recipe.model';

export class RecipesService {
  async create(resource: IRecipe): Promise<RecipeDocument> {
    return RecipesDao.createRecipe(resource);
  }
  async get(userId: string, filter: OmitIRecipe): Promise<RecipeDocument[]> {
    const fulFilter = PartialIRecipe(filter, { addedBy: userId });

    return RecipesDao.getUserRecipes(fulFilter);
  }
  async getAll(filter: OmitIRecipe, limit: any, offset: any): Promise<RecipeDocument[]> {
    const newFilter: ExcludeIRecipe = filter;
    return RecipesDao.getAllUserRecipes(newFilter, limit, offset);
  }

  async findById(id: string): Promise<RecipeDocument> {
    return RecipesDao.findByIdRecipe(id);
  }

  async update(id: string, resource: IRecipe): Promise<RecipeDocument> {
    return RecipesDao.updateRecipe(id, resource);
  }

  async remove(id: string): Promise<RecipeDocument | null> {
    return RecipesDao.removeByIdRecipe(id);
  }
}

export default new RecipesService();
