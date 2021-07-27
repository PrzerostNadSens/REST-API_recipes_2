import { body, ValidationChain } from "express-validator";

const messageString = "Field must be a string!";
const messageEmpty = "Field can not be empty!";

const regexEmail =
  /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;

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
  .matches(regexEmail)
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
  .withMessage(messageEmpty)
  .isIn(["Admin", "User"])
  .withMessage(`Required Admin or User.`);

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
