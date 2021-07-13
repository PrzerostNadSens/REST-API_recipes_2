import RecipesDao from "../daos/recipes.dao";
import { RECIPE } from "../interfaces/recipe.interface";
import { CreateRecipesDto } from "../dto/create.recipe.dto";
import config from "../../config.json";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Recipe } from "../model/recipeModel";

class RecipesService implements RECIPE {
  async create(resource: CreateRecipesDto) {
    return RecipesDao.addRecipe(resource);
  }

  //   async deleteById(id: string) {
  //     return RecipesDao.removeRecipeById(id);
  //   }

  //   async list(limit: number, page: number) {
  //     return RecipesDao.getRecipes();
  //   }

  //   async readById(id: string) {
  //     return RecipesDao.getRecipeById(id);
  //   }

  //   async putById(id: string, resource: PutRecipeDto) {
  //     return RecipesDao.putRecipeById(id, resource);
  //   }
}

export default new RecipesService();
