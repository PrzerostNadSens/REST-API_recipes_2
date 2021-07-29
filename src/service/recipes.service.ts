import RecipesDao from '../daos/recipes.dao';
import { IRecipe, PartialIRecipe, OmitIRecipe } from '../model/recipe.model';

class RecipesService {
  async create(resource: IRecipe) {
    return RecipesDao.createRecipe(resource);
  }
  async get(userId: string, filter: OmitIRecipe) {
    const fulFilter = PartialIRecipe(filter, { added_by: userId });

    return RecipesDao.getUserRecipes(fulFilter);
  }
  async getAll(filter: OmitIRecipe) {
    return RecipesDao.getAllUserRecipes(filter);
  }

  async findById(id: string) {
    return RecipesDao.findByIdRecipe(id);
  }

  async update(id: string, resource: IRecipe) {
    return RecipesDao.updateRecipe(id, resource);
  }

  async remove(id: string) {
    return RecipesDao.removeByIdRecipe(id);
  }
}

export default new RecipesService();
