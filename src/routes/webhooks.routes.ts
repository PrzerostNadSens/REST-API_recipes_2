import express, { NextFunction, Request, Response } from 'express';
import WebhooksController from '../controller/webhooks.controller';
import { StrategyOptions, auth } from '../middleware/auth.middleware';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.get('/', auth.authenticate([StrategyOptions.Bearer]), WebhooksController.getUserWebhooks);

router.post('/', auth.authenticate([StrategyOptions.Bearer]), WebhooksController.createWebhook);

router.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (!'GET'.includes(req.method)) {
    return res.status(StatusCodes.NOT_FOUND).json();
  }
  return next();
});

export default router;
