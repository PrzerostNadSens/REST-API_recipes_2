import { Recipe, RecipeDocument } from "../model/recipeModel";
const jwt = require("express-jwt");
import { secret } from "../../config.json";
import express, { Request, Response } from "express";
import PostNotFoundException from "../exceptions/PostNotFoundException";

interface AuthorizedRequest extends Request {
  user?: any;
}

function return_id(req: AuthorizedRequest) {
  jwt({ secret, algorithms: ["HS256"] });
  return req.user.id;
}

export const index = async function (req: AuthorizedRequest, res: Response) {
  const recipes = await Recipe.find({});

  const id: String = return_id(req);

  const recipeMap: RecipeDocument[] = recipes.filter(
    (recipe) => recipe.added_by == id
  );

  return res.send(recipeMap);
};
export const index_all = async function (
  req: AuthorizedRequest,
  res: Response
) {
  const recipes = await Recipe.find({});
  return res.send(recipes);
};

export const create = async function (req: Request, res: Response) {
  try {
    const newItem: Recipe = req.body;
    newItem.added_by = return_id(req);

    const recipe = await Recipe.create(newItem);

    res.status(201).json(recipe);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const findById = async function (req: Request, res: Response) {
  const id = req.params.recipe_id;

  const recipe = await Recipe.findById(id);
  if (!recipe) {
    return res
      .status(404)
      .json({ message: `The recipe with the given id: ${id} does not exist` });
  }
  if (recipe.added_by != return_id(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json({
    data: recipe,
  });
};

export const update = async function (req: Request, res: Response) {
  const id = req.params.recipe_id;
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    return res
      .status(404)
      .json({ message: `The recipe with the given id: ${id} does not exist` });
  }
  if (recipe.added_by !== return_id(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  recipe.name = req.body.name ? req.body.name : recipe.name;
  (recipe.type = req.body.type),
    (recipe.photo = req.body.photo),
    (recipe.recipe = req.body.recipe),
    recipe.save();
  res.json({
    data: recipe,
  });
};

export const remove = async function (req: Request, res: Response) {
  const id = req.params.recipe_id;
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    return res
      .status(404)
      .json({ message: `The recipe with the given id: ${id} does not exist` });
  }
  if (recipe.added_by !== return_id(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  recipe.remove();
  res.json({
    message: "Recipe deleted",
  });
};
