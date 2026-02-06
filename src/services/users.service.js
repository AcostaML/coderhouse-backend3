import { UsersDAO } from "../dao/users.dao.js";

export class UsersService {
  constructor() {
    this.usersDAO = new UsersDAO();
  }

  getAll() {
    return this.usersDAO.findAll();
  }

  create(user) {
    return this.usersDAO.createOne(user);
  }

  createMany(users) {
    return this.usersDAO.createMany(users);
  }

  pushPetsToUsers(userPets) {
    return this.usersDAO.pushPetsToUsers(userPets);
  }
}
