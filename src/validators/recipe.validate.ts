import { body, param, ValidationChain } from 'express-validator';

const messageString = 'Field must be a string!';
const messageEmpty = 'Field can not be empty!';
const messageMongoId = 'Field must by mongoId!';

const validateRecipeId = param('recipeId').isMongoId().withMessage(messageMongoId);

export const validateMongoId: ValidationChain[] = [validateRecipeId];

const validateNameRequired = body('name').isString().withMessage(messageString).notEmpty().withMessage(messageEmpty);

const validateNameOptional = body('name')
  .isString()
  .withMessage(messageString)
  .notEmpty()
  .withMessage(messageEmpty)
  .optional();

const validateType = body('type').isString().withMessage(messageString).optional();

const validatePhoto = body('photo')
  .isString()
  .withMessage(messageString)
  .isURL()
  .withMessage(`Photo must be in the form of a URL`)
  .optional();

const validateRecipeRequired = body('recipe')
  .isString()
  .withMessage(messageString)
  .notEmpty()
  .withMessage(messageEmpty);

const validateRecipeOptional = body('recipe')
  .isString()
  .withMessage(messageString)
  .notEmpty()
  .withMessage(messageEmpty)
  .optional();

export const validateCreateRecipe: ValidationChain[] = [
  validateNameRequired,
  validateType,
  validatePhoto,
  validateRecipeRequired,
];

export const validateUpdateRecipe: ValidationChain[] = [
  validateNameOptional,
  validateType,
  validatePhoto,
  validateRecipeOptional,
];
