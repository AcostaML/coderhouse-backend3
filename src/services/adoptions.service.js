import { AdoptionsDAO } from "../dao/adoptions.dao.js";
import { PetsDAO } from "../dao/pets.dao.js";
import { UsersDAO } from "../dao/users.dao.js";

export class AdoptionsService {
  constructor() {
    this.adoptionsDAO = new AdoptionsDAO();
    this.petsDAO = new PetsDAO();
    this.usersDAO = new UsersDAO();
  }

  getAll() {
    return this.adoptionsDAO.findAll();
  }

  getOne(id) {
    return this.adoptionsDAO.findById(id);
  }

  async create({ userId, petId }) {
    const pet = await this.petsDAO.findById(petId);
    if (!pet) return { error: "Pet not found", code: 404 };

    const user = (await this.usersDAO.findAll()).find(u => String(u._id) === String(userId));
    if (!user) return { error: "User not found", code: 404 };

    // Transferimos owner del pet al userId
    const updatedPet = await this.petsDAO.updateById(petId, { owner: userId });

    // Agregamos el pet al array pets del user
    await this.usersDAO.pushPetsToUsers([{ userId, petIds: [petId] }]);

    const adoption = await this.adoptionsDAO.createOne({ user: userId, pet: petId });
    return { adoption, updatedPet };
  }

  remove(id) {
    return this.adoptionsDAO.deleteById(id);
  }
}
