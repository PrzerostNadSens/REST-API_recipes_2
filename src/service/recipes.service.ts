import RecipesDao from '../daos/recipes.dao';
import { IRecipe, PartialIRecipe, OmitIRecipe, RecipeDocument } from '../model/recipe.model';

export class RecipesService {
  async create(resource: IRecipe): Promise<string> {
    return RecipesDao.createRecipe(resource);
  }
  async get(userId: string, filter: OmitIRecipe): Promise<RecipeDocument[]> {
    const fulFilter = PartialIRecipe(filter, { addedBy: userId });

    return RecipesDao.getUserRecipes(fulFilter);
  }
  async getAll(filter: OmitIRecipe): Promise<RecipeDocument[]> {
    return RecipesDao.getAllUserRecipes(filter);
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
