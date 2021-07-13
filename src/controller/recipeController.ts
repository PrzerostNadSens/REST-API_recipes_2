import { Recipe, RecipeDocument } from "../model/recipeModel";
const jwt = require("express-jwt");
import { secret } from "../../config.json";
import express, { NextFunction, Request, Response } from "express";
import PostNotFoundException from "../exceptions/PostNotFoundException";
import RecipesService from "../service/recipes.service";

class RecipesController {
  // async getUserById(req: Request, res: Response) {
  //   const user = await RecipesService.readById(req.body.id);
  //   res.status(200).send(user);
  // }

  async createRecipe(req: Request, res: Response) {
    try {
      req.body.added_by = return_id(req);
      const recipeId = await RecipesService.create(req.body);
      res.status(201).send({ id: recipeId });
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  async indexRecipe(req: AuthorizedRequest, res: Response) {
    const recipes = await Recipe.find({});

    const id: String = return_id(req);

    const recipeMap: RecipeDocument[] = recipes.filter(
      (recipe) => recipe.added_by == id
    );

    return res.send(recipeMap);
  }

  async index_allRecipe(req: AuthorizedRequest, res: Response) {
    const recipes = await Recipe.find({});
    return res.send(recipes);
  }

  async viewRecipe(req: Request, res: Response) {
    const id = req.params.recipe_id;

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res
        .status(401)
        .json({ message: `Przepis o podanym id: ${id} nie istnieje` });
    }
    if (recipe.added_by != return_id(req)) {
      return res.status(401).json({ message: "Nieautoryzowany" });
    }
    res.json({
      data: recipe,
    });
  }

  async updateRecipe(req: Request, res: Response) {
    const id = req.params.recipe_id;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res
        .status(401)
        .json({ message: `Przepis o podanym id: ${id} nie istnieje` });
    }
    if (recipe.added_by !== return_id(req)) {
      return res.status(401).json({ message: "Nieautoryzowany" });
    }
    recipe.name = req.body.name ? req.body.name : recipe.name;
    (recipe.type = req.body.type),
      (recipe.photo = req.body.photo),
      (recipe.recipe = req.body.recipe),
      recipe.save();
    res.json({
      data: recipe,
    });
  }

  async removeRecipe(req: Request, res: Response) {
    const id = req.params.recipe_id;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res
        .status(401)
        .json({ message: `Przepis o podanym id: ${id} nie istnieje` });
    }
    if (recipe.added_by !== return_id(req)) {
      return res.status(401).json({ message: "Nieautoryzowany" });
    }
    recipe.remove();
    res.json({
      message: "Recipe deleted",
    });
  }
}
export default new RecipesController();

interface AuthorizedRequest extends Request {
  user?: any;
}

function return_id(req: AuthorizedRequest) {
  jwt({ secret, algorithms: ["HS256"] });
  return req.user.id;
}
