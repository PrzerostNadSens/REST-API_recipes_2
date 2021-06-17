const express = require('express');
const db = require('mongodb/db');

exports.index = function (req, res) {
    db.Recipe.find({}, function(err, recipes) {
        var recipeMap = {};
    
        recipes.forEach(function(recipe) {
          recipeMap[recipe._id] = recipe;
        });
    
        res.send(recipeMap);  
      });
};



exports.new = function (req, res) {
 
    var recipe = new db.Recipe();
    recipe.name = req.body.name ? req.body.name : recipe.name;
    recipe.type = req.body.type,
    recipe.photo = req.body.photo,
    recipe.recipe = req.body.recipe,

    recipe.save(function (err) {
         if (err)
             res.json(err);
res.json({
            id: recipe._id
        });
    });
};

exports.view = function (req, res) {
    db.Recipe.findById(req.params.recipe_id, function (err, recipe) {
        if (err)
            res.send(err);
        res.json({
            data: recipe
        });
    });
};

exports.update = function (req, res) {
db.Recipe.findById(req.params.recipe_id, function (err, recipe) {
        if (err)
            res.send(err);
recipe.name = req.body.name ? req.body.name : recipe.name;
        recipe.gender = req.body.gender;
        recipe.email = req.body.email;
        recipe.phone = req.body.phone;
        recipe.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                data: recipe
            });
        });
    });
};

exports.delete = function (req, res) {
    db.Recipe.remove({
        _id: req.params.recipe_id
    }, function (err, recipe) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Recipe deleted'
        });
    });
};