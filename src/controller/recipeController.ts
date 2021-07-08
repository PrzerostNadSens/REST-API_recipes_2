import db from "../mongodb/db";
const jwt = require("express-jwt");
import { secret } from "../../config.json";
import express, { NextFunction, Request, Response } from "express";

interface AuthorizedRequest extends Request {
  user?: any;
}

function return_id(req: AuthorizedRequest) {
  jwt({ secret, algorithms: ["HS256"] });
  return req.user.id; //do zmiany
}

export const index = function (req: AuthorizedRequest, res: Response) {
  db.Recipe.find({}, function (err: Error, recipes: any) {
    const recipeMap: string[] = [];

    recipes.forEach(function (recipe: any) {
      if (recipe.added_by == return_id(req)) {
        recipeMap[recipe._id!] = recipe;
      }
    });

    res.send(recipeMap);
  });
};
export const index_all = function (req: Request, res: Response) {
  db.Recipe.find({}, function (err: Error, recipes: any) {
    const recipeMap: string[] = [];

    recipes.forEach(function (recipe: any) {
      recipeMap[recipe._id!] = recipe;
    });

    res.send(recipeMap);
  });
};

export const create = function (req: Request, res: Response) {
  const recipe = new db.Recipe();
  recipe.name = req.body.name ? req.body.name : recipe.name;
  (recipe.type = req.body.type),
    (recipe.photo = req.body.photo),
    (recipe.recipe = req.body.recipe),
    (recipe.added_by = return_id(req)),
    recipe.save(function (err: Error) {
      if (err) res.json(err);
      res.json({
        //data: recipe
        id: recipe._id,
      });
    });
};

export const view = function (req: Request, res: Response) {
  db.Recipe.findById(req.params.recipe_id, function (err: Error, recipe: any) {
    if (recipe.added_by == return_id(req)) {
      if (err) res.send(err);

      res.json({
        data: recipe,
      });
    } else return res.status(401).json({ message: "Nieautoryzowany" });
  });
};
//const user = await db.User.findById((req.user as any).id);
export const update = function (req: Request, res: Response) {
  db.Recipe.findById(req.params.recipe_id, function (err: Error, recipe: any) {
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
  db.Recipe.findById(req.params.recipe_id, function (err: Error, recipe: any) {
    if (recipe.added_by == return_id(req)) {
      db.Recipe.remove(
        {
          _id: req.params.recipe_id,
        },
        function (err: Error, recipe: string) {
          if (err) {
            res.send(err);
          }
          res.json({
            status: "success",
            message: "Recipe deleted",
          });
        }
      );
    } else {
      return;
      {
        res.status(401).json({ message: "Nieautoryzowany" });
      }
    }
  });
};
