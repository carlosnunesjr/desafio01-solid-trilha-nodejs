import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  // eslint-disable-next-line prettier/prettier
  constructor(private createUserUseCase: CreateUserUseCase) { }

  handle(request: Request, response: Response): Response {
    const { name, email } = request.body;

    let user = null;
    try {
      user = this.createUserUseCase.execute({ name, email });
    } catch (e) {
      return response.status(400).json({ error: e.message });
    }

    return response.status(201).json(user);
  }
}

export { CreateUserController };
