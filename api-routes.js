let router = require('express').Router();
const Role = require('mongodb/role');
const authorize = require('./mongodb/authorize')

var recipeController = require('./controller/recipeController');

router.route('/')
    .get(authorize(Role.Admin), recipeController.index)
    .post(authorize(), recipeController.new);
router.route('/:recipe_id')
    .get(authorize(), recipeController.view)
    .put(authorize(), recipeController.update)
    .delete(authorize(), recipeController.delete);

module.exports = router;