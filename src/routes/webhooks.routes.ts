import express, { NextFunction, Request, Response } from 'express';
import WebhooksController from '../controller/webhooks.controller';
import { validateWebhook, validateMongoId } from '../validators/webhook.validate';
import { validate } from '../middleware/validate.middleware';
import { StrategyOptions, auth } from '../middleware/auth.middleware';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

/**
 * @swagger
 * /webhooks/:
 *   get:
 *     tags:
 *       - webhook
 *     description: Displays webhooks belonging to the user.
 *     produces:
 *       - application/json
 *
 *     responses:
 *       200:
 *         description: Webhooks
 *       401:
 *         description: Unauthorized. When the user is not logged in.
 */

router.get('/', auth.authenticate([StrategyOptions.Bearer]), WebhooksController.getUserWebhooks);

/**
 * @swagger
 * /webhooks/:
 *   post:
 *     tags:
 *       - webhook
 *     description: creating a webhook.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: webhook
 *         description: Required URL in url.
 *         schema:
 *           $ref: '#/definitions/Webhook'
 *
 *     responses:
 *       201:
 *         description: Webhook id.
 *       400:
 *         description: Bad Request. For example, validation errors.
 *       401:
 *         description: Unauthorized. When the user is not logged in.
 *
 */

router.post(
  '/',
  auth.authenticate([StrategyOptions.Bearer]),
  validate(validateWebhook),
  WebhooksController.createWebhook,
);

/**
 * @swagger
 * /webhooks/{id}:
 *   put:
 *     tags:
 *       - webhook
 *     description: update webhook belonging to the user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: webhook
 *         description: Required URL in url.
 *         schema:
 *           $ref: '#/definitions/Webhook'
 *
 *     responses:
 *       200:
 *         description: Webhooks
 *         properties:
 *           id:
 *             type: string
 *       400:
 *         description: Bad Request. For example, giving an id of wrong origin or validation errors.
 *       401:
 *         description: Unauthorized. When the user is not logged in.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: The webhook with the given id does not exist.
 */

router.put(
  '/:webhookId',
  auth.authenticate([StrategyOptions.Bearer]),
  validate(validateWebhook),
  validate(validateMongoId),
  WebhooksController.updateWebhook,
);

/**
 * @swagger
 * /webhooks/{id}:
 *   delete:
 *     tags:
 *       - webhook
 *     description: removes webhook belonging to the user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       204:
 *         description: Removed.
 *       400:
 *         description: Bad Request. For example, giving an id of wrong origin.
 *       401:
 *         description: Unauthorized. When the user is not logged in.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: The webhook with the given id does not exist.
 */

router.delete(
  '/:webhookId',
  auth.authenticate([StrategyOptions.Bearer]),
  validate(validateMongoId),
  WebhooksController.removeByIdWebhook,
);

router.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (!'GET'.includes(req.method)) {
    return res.status(StatusCodes.NOT_FOUND).json();
  }
  return next();
});

export default router;

/**
 * @swagger
 * tags:
 * - name: webhook
 *   description: "handling of webhooks"
 * definitions:
 *   Webhook:
 *     properties:
 *       url:
 *         type: string
 *     # Both properties are required
 *     required:
 *       - url
 */
