import { Recipe, RecipeDocument } from "../model/recipeModel";
const jwt = require("express-jwt");
import { secret } from "../../config.json";
import express, { NextFunction, Request, Response } from "express";

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

export const create = function (req: Request, res: Response) {
  let recipe = new Recipe();
  recipe.name = req.body.name ? req.body.name : recipe.name;
  (recipe.type = req.body.type),
    (recipe.photo = req.body.photo),
    (recipe.recipe = req.body.recipe),
    (recipe.added_by = return_id(req)),
    recipe.save();
  /*
    recipe.save(function (err: Error) {
      {
        res.json(err);
      }
      res.json({
        //data: recipe
        id: recipe._id,
      });
    });
    */
};

export const view = function (req: Request, res: Response) {
  Recipe.findById(req.params.recipe_id, function (err: Error, recipe: any) {
    if (recipe.added_by == return_id(req)) {
      if (err) res.send(err);

      res.json({
        data: recipe,
      });
    } else return res.status(401).json({ message: "Nieautoryzowany" });
  });
};
//const user = await User.findById((req.user as any).id);
export const update = function (req: Request, res: Response) {
  Recipe.findById(req.params.recipe_id, function (err: Error, recipe: any) {
    if (recipe.added_by == return_id(req)) {
      if (err) {
        res.send(err);
      }
      recipe.name = req.body.name ? req.body.name : recipe.name;
      (recipe.type = req.body.type),
        (recipe.photo = req.body.photo),
        (recipe.recipe = req.body.recipe),
        recipe.save(function (err: Error) {
          if (err) res.json(err);
          res.json({
            data: recipe,
          });
        });
    } else {
      return res.status(401).json({ message: "Nieautoryzowany" });
    }
  });
};

export const remove = function (req: Request, res: Response) {
  Recipe.findById(req.params.recipe_id, function (err: Error, recipe: any) {
    if (recipe.added_by == return_id(req)) {
      recipe.remove(function (err: Error) {
        if (err) {
          res.json(err);
        }
        res.json({
          status: "success",
          message: "Recipe deleted",
        });
      });
    } else {
      return;
      {
        res.status(401).json({ message: "Nieautoryzowany" });
      }
    }
  });
};
