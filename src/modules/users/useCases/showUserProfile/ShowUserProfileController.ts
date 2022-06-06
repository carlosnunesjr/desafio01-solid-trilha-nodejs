import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  // eslint-disable-next-line prettier/prettier
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) { }

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;

    let user = null;
    try {
      user = this.showUserProfileUseCase.execute({ user_id });
    } catch (e) {
      return response.status(404).json({ error: e.message });
    }

    return response.status(200).json(user);
  }
}

export { ShowUserProfileController };
