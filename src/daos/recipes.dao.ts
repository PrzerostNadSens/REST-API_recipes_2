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

  async updateRecipe(id: string, req: CreateRecipesDto) {
    const recipe = await Recipe.findById(id);
    if (recipe) {
      recipe.name = req.name ? req.name : recipe.name;
      recipe.type = req.type;
      recipe.photo = req.photo;
      recipe.recipe = req.recipe;
      recipe.save();
      return recipe;
    }
    //`${id} update`
  }

  async removeRecipe(id: string) {
    const recipe = await Recipe.findById(id);
    if (recipe) {
      recipe.remove();
      return `${id} removed`;
    }
  }
}

export default new RecipesDao();
