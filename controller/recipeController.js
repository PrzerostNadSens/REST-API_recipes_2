const db = require('mongodb/db');
const jwt = require('express-jwt');
const { secret } = require('config.json');

function return_id(req) {
    jwt({ secret, algorithms: ['HS256'] });
    return req.user.id;
}

exports.index = function (req, res) {
    db.Recipe.find({}, function(err, recipes) {
        var recipeMap = {};
    iidd = return_id(req);
        recipes.forEach(function(recipe) {
            if (recipe.added_by ==  iidd)
            {
                recipeMap[recipe._id] = recipe;
            }
        });
    
        res.send(recipeMap);  
      });
};
exports.index_all = function (req, res) {
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
    recipe.added_by = return_id(req),

    recipe.save(function (err) {
         if (err)
             res.json(err);
res.json({
            //data: recipe
            id: recipe._id
        });
    });
};

exports.view = function (req, res) {

    db.Recipe.findById(req.params.recipe_id, function (err, recipe) {
        if (recipe.added_by == return_id(req))
        {
            if (err)
                res.send(err);

            res.json({
                data: recipe
            });
        }
        else return res.status(401).json({ message: 'Nieautoryzowany' });
    });
};

exports.update = function (req, res) {
    db.Recipe.findById(req.params.recipe_id, function (err, recipe) {
        if (recipe.added_by == return_id(req))
        {
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
        }
        else return res.status(401).json({ message: 'Nieautoryzowany' });
    });
};

exports.delete = function (req, res) {
    db.Recipe.findById(req.params.recipe_id, function (err, recipe) {
        if (recipe.added_by == return_id(req))
        {
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
        }
        else return res.status(401).json({ message: 'Nieautoryzowany' });
    });
};