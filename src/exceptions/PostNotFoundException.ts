import HttpException from "./HttpException";

class PostNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Przepis o podanym id: ${id} nie istnieje`);
  }
}

export default PostNotFoundException;
