import db from "../mongodb/db";
const jwt = require("express-jwt");
import { secret } from "../../config.json";
import express, { NextFunction, Request, Response } from "express";

function return_id(req: Request) {
  jwt({ secret, algorithms: ["HS256"] });
  return (req.user as any).id; //do zmiany
}

exports.index = function (req: Request, res: Response) {
  db.Recipe.find({}, function (err: Error, recipes: any) {
    var recipeMap: string[] = [];

    recipes.forEach(function (recipe: any) {
      if (recipe.added_by == return_id(req)) {
        recipeMap[recipe._id!] = recipe;
      }
    });

    res.send(recipeMap);
  });
};
exports.index_all = function (req: Request, res: Response) {
  db.Recipe.find({}, function (err: Error, recipes: any) {
    var recipeMap: string[] = [];

    recipes.forEach(function (recipe: any) {
      recipeMap[recipe._id!] = recipe;
    });

    res.send(recipeMap);
  });
};

exports.new = function (req: Request, res: Response) {
  var recipe = new db.Recipe();
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

exports.view = function (req: Request, res: Response) {
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
exports.update = function (req: Request, res: Response) {
  db.Recipe.findById(req.params.recipe_id, function (err: Error, recipe: any) {
    if (recipe.added_by == return_id(req)) {
      if (err) res.send(err);
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
    } else return res.status(401).json({ message: "Nieautoryzowany" });
  });
};

exports.delete = function (req: Request, res: Response) {
  db.Recipe.findById(req.params.recipe_id, function (err: Error, recipe: any) {
    if (recipe.added_by == return_id(req)) {
      db.Recipe.remove(
        {
          _id: req.params.recipe_id,
        },
        function (err: Error, recipe: string) {
          if (err) res.send(err);
          res.json({
            status: "success",
            message: "Recipe deleted",
          });
        }
      );
    } else return res.status(401).json({ message: "Nieautoryzowany" });
  });
};
