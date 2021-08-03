import HttpException from './HttpException';

class PostNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `The recipe with the given id: ${id} does not exist`);
  }
}

export default PostNotFoundException;
