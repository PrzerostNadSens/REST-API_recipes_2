import express from 'express';
import webhooksController from '../controller/webhooks.controller';
import { validateWebhook, validateMongoId } from '../validators/webhook.validate';
import { validate } from '../middleware/validate.middleware';
import { StrategyOptions, auth } from '../middleware/auth.middleware';

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

router.get('/', auth.authenticate([StrategyOptions.Bearer]), (req, res) =>
  webhooksController.getUserWebhooks(req, res),
);
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

router.post('/', auth.authenticate([StrategyOptions.Bearer]), validate(validateWebhook), (req, res) =>
  webhooksController.createWebhook(req, res),
);

/**
 * @swagger
 * /webhooks/:webhookId:
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
 *         description: Validation error. See response body for details.
 *       401:
 *         description: Unauthorized. When the user is not logged in.
 *       403:
 *         description: Access forbidden. User is not authorized to access this resource.
 *       404:
 *         description: The webhook with the given id does not exist.
 */

router.put(
  '/:webhookId',
  auth.authenticate([StrategyOptions.Bearer]),
  validate(validateWebhook),
  validate(validateMongoId),
  (req, res) => webhooksController.updateWebhook(req, res),
);

/**
 * @swagger
 * /webhooks/:webhookId:
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
 *         description: Webhook successfully removed.
 *       400:
 *         description: Validation error. See response body for details.
 *       401:
 *         description: Unauthorized. When the user is not logged in.
 *       403:
 *         description: Access forbidden. User is not authorized to access this resource.
 *       404:
 *         description: The webhook with the given id does not exist.
 */

router.delete('/:webhookId', auth.authenticate([StrategyOptions.Bearer]), validate(validateMongoId), (req, res) =>
  webhooksController.removeByIdWebhook(req, res),
);

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
