import { body, ValidationChain } from "express-validator";

const messageString = "Field must be a string!";
const messageEmpty = "Field can not be empty!";

const validateFirstName = body("first_name")
  .isString()
  .withMessage(messageString)
  .notEmpty()
  .withMessage(messageEmpty);
const validateFirstLast = body("last_name")
  .isString()
  .withMessage(messageString)
  .notEmpty()
  .withMessage(messageEmpty);
const validateLogin = body("login")
  .isString()
  .withMessage(messageString)
  .notEmpty()
  .withMessage(messageEmpty);
const validateEmail = body("email")
  .isString()
  .withMessage(messageString)
  .notEmpty()
  .withMessage(messageEmpty)
  .isEmail()
  .withMessage("This is not an email!");
const validatePassword = body("password")
  .isString()
  .withMessage(messageString)
  .notEmpty()
  .withMessage(messageEmpty)
  .isStrongPassword()
  .withMessage("Password is too weak!");
const validateRole = body("role")
  .isString()
  .withMessage(messageString)
  .notEmpty()
  .withMessage(messageEmpty);

export const validateUserRegister: ValidationChain[] = [
  validateFirstName,
  validateFirstLast,
  validateLogin,
  validateEmail,
  validatePassword,
  validateRole,
];

export const validateUserLogin: ValidationChain[] = [
  validateLogin,
  validatePassword,
];
