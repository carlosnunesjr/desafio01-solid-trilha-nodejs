import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  // eslint-disable-next-line prettier/prettier
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) { }

  handle(request: Request, response: Response): Response {
    let { user_id } = request.headers;
    user_id = user_id as string;

    let listUsers = null;
    try {
      listUsers = this.listAllUsersUseCase.execute({ user_id });
    } catch (e) {
      return response.status(400).json({ error: e.message });
    }

    return response.status(200).json(listUsers);
  }
}

export { ListAllUsersController };
