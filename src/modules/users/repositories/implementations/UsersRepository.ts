import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    Object.assign(user, {
      name,
      email,
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.filter((user) => user.id === id);

    return user ? user[0] : undefined;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.filter((user) => user.email === email);

    return user ? user[0] : undefined;
  }

  turnAdmin(receivedUser: User): User {
    const user = this.users.filter((user) => user.id === receivedUser.id);
    if (user) {
      user[0].admin = true;
      user[0].updated_at = new Date();
    }

    return receivedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
