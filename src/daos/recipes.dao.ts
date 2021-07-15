import debug from "debug";
import { Recipe, IRecipe } from "../model/recipeModel";

const log: debug.IDebugger = debug("app:in-memory-dao");

class RecipesDao {
  constructor() {
    log("Created new instance of RecipesDao");
  }
  async createRecipe(createRecipeBody: IRecipe) {
    const recipeToSave = new Recipe(createRecipeBody);
    await recipeToSave.save();
    return recipeToSave.id;
  }

  async updateRecipe(id: string, updateRecipeBody: IRecipe) {
    const recipeToUpdate = await Recipe.findById(id);
    if (recipeToUpdate) {
      const { type, photo, recipe } = updateRecipeBody;
      recipeToUpdate.name = updateRecipeBody.name
        ? updateRecipeBody.name
        : recipeToUpdate.name;
      recipeToUpdate.type = type;
      recipeToUpdate.photo = photo;
      recipeToUpdate.recipe = recipe;
      recipeToUpdate.update();
      return recipeToUpdate;
    }
  }

  async removeRecipe(id: string) {
    const recipeToRemove = await Recipe.findById(id);
    if (recipeToRemove) {
      recipeToRemove.remove();
      return `${id} removed`;
    }
  }
}

export default new RecipesDao();