import RecipesDao from "../daos/recipes.dao";
import { RECIPE } from "../interfaces/recipe.interface";
import { CreateRecipesDto } from "../dto/create.recipe.dto";

class RecipesService implements RECIPE {
  async create(resource: CreateRecipesDto) {
    return RecipesDao.addRecipe(resource);
  }

  async update(id: string, resource: CreateRecipesDto) {
    return RecipesDao.updateRecipe(id, resource);
  }

  async remove(id: string) {
    return RecipesDao.removeRecipe(id);
  }
}

export default new RecipesService();
