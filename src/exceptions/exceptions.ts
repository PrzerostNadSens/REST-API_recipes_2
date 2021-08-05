import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { WebhookDocument } from '../model/webhook.model';

class responses {
  sendInternalServerErrorResponse(res: Response) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
  }

  sendCreatedWithId(res: Response, id: string) {
    return res.status(StatusCodes.CREATED).send({ id: id });
  }

  sendOkWithWebhook(res: Response, webhook: WebhookDocument[]) {
    return res.status(StatusCodes.OK).send(webhook);
  }
}

export default new responses();
