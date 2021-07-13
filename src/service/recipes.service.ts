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

  async remove(id: string) {
    return RecipesDao.removeRecipe(id);
  }
}

export default new RecipesService();
