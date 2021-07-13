import { CreateRecipesDto } from "../dto/create.recipe.dto";
import shortid from "shortid";
import debug from "debug";
import { Recipe } from "../model/recipeModel";

const log: debug.IDebugger = debug("app:in-memory-dao");

class RecipesDao {
  recipes: Array<CreateRecipesDto> = [];

  constructor() {
    log("Created new instance of RecipesDao");
  }

  async addRecipe(recipe: CreateRecipesDto) {
    const r = new Recipe({
      name: recipe.name,
      type: recipe.type,
      photo: recipe.photo,
      recipe: recipe.recipe,
      added_by: recipe.added_by,
    });
    await r.save();
    return r.id;
  }

  async removeRecipe(id: string) {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return { message: `Przepis o podanym id: ${id} nie istnieje` };
    }
    recipe.remove();
    return "removed";
  }
}

export default new RecipesDao();
