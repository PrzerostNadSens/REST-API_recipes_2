import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { WebhookDocument } from '../model/webhook.model';
import { RecipeDocument } from '../model/recipe.model';
class Responses {
  sendInternalServerErrorResponse(res: Response) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
  }

  sendCreatedWithId(res: Response, id: string) {
    return res.status(StatusCodes.CREATED).send({ id: id });
  }

  sendNoContent(res: Response) {
    return res.status(StatusCodes.NO_CONTENT).send();
  }

  sendOkWithRecipe(res: Response, recipe: RecipeDocument) {
    return res.status(StatusCodes.OK).send(recipe);
  }

  sendCreateWithRecipe(res: Response, recipe: RecipeDocument) {
    return res.status(StatusCodes.CREATED).send(recipe);
  }

  sendCreateWithWebhook(res: Response, webhook: WebhookDocument) {
    return res.status(StatusCodes.CREATED).send(webhook);
  }

  sendOkWithRecipes(res: Response, recipes: RecipeDocument[]) {
    return res.status(StatusCodes.OK).send(recipes);
  }

  sendOkWithWebhook(res: Response, webhook: WebhookDocument) {
    return res.status(StatusCodes.OK).send(webhook);
  }

  sendOkWithWebhooks(res: Response, webhook: WebhookDocument[]) {
    return res.status(StatusCodes.OK).send(webhook);
  }

  forbidden(res: Response) {
    return res.status(StatusCodes.FORBIDDEN).send({ message: 'Forbidden' });
  }

  notFound(res: Response, source: string) {
    return res.status(StatusCodes.NOT_FOUND).send({ message: ` The ${source} with the given id does not exist.` });
  }

  notUnique(res: Response, source: string) {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: ` ${source} with the given url already exists.` });
  }
}

export default new Responses();
