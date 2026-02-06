import { PetsDAO } from "../dao/pets.dao.js";

export class PetsService {
  constructor() {
    this.petsDAO = new PetsDAO();
  }

  getAll() {
    return this.petsDAO.findAll();
  }

  getOne(id) {
    return this.petsDAO.findById(id);
  }

  create(pet) {
    return this.petsDAO.createOne(pet);
  }

  update(id, update) {
    return this.petsDAO.updateById(id, update);
  }

  remove(id) {
    return this.petsDAO.deleteById(id);
  }

  createMany(pets) {
    return this.petsDAO.createMany(pets);
  }
}
