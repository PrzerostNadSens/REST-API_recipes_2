import { body, param, ValidationChain } from 'express-validator';

const messageString = 'Field must be a string!';
const messageEmpty = 'Field can not be empty!';
const messageMongoId = 'Field must by mongoId!';

const validateWebhookId = param('webhookId').isMongoId().withMessage(messageMongoId);

export const validateMongoId: ValidationChain[] = [validateWebhookId];

const validateUrl = body('url')
  .isString()
  .withMessage(messageString)
  .isURL()
  .withMessage(`Webhook must be in the form of a URL`)
  .notEmpty()
  .withMessage(messageEmpty);

export const validateWebhook: ValidationChain[] = [validateUrl];
