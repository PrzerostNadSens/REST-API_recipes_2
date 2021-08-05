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

  notUniqueLogin(res: Response) {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: 'User with the given login already exists.' });
  }

  notUniqueUrl(res: Response) {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Webhook with the given url already exists.' });
  }
}

export default new responses();
