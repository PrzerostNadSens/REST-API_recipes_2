import { body, ValidationChain } from "express-validator";

const validateFirstName = body("first_name").isString().notEmpty();

export const validateUserRegister: ValidationChain[] = [validateFirstName];
