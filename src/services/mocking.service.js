import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

const DEFAULT_PASSWORD = "coder123";
const SALT_ROUNDS = 10;

const PET_TYPES = ["dog", "cat", "hamster", "parrot", "rabbit", "turtle", "fish"];

function buildUniqueEmail(usedEmails) {
  // Estrategia: genera y si colisiona, vuelve a intentar.
  // Además le agregamos un sufijo aleatorio para reducir colisiones.
  for (let i = 0; i < 50; i++) {
    const emailBase = faker.internet.email({ provider: "mail.com" }).toLowerCase();
    const email = emailBase.replace("@", `+${faker.string.alphanumeric(8).toLowerCase()}@`);
    if (!usedEmails.has(email)) {
      usedEmails.add(email);
      return email;
    }
  }
  // fallback extremo
  const fallback = `user_${faker.string.uuid()}@mail.com`;
  usedEmails.add(fallback);
  return fallback;
}

export class MockingService {
  async hashDefaultPassword() {
    return bcrypt.hash(DEFAULT_PASSWORD, SALT_ROUNDS);
  }

  /**
   * GET mockingusers: EXACTAMENTE 50, 2 admin y 48 user, pets: []
   */
  async generateMockUsers50() {
    const usedEmails = new Set();
    const hashedPassword = await this.hashDefaultPassword();

    const users = Array.from({ length: 50 }, (_, idx) => ({
      _id: new mongoose.Types.ObjectId(),
      email: buildUniqueEmail(usedEmails),
      password: hashedPassword,
      role: idx < 2 ? "admin" : "user",
      pets: []
    }));

    return users;
  }

  /**
   * GET mockingpets: mocks sin persistencia. Incluye _id tipo Mongo.
   * @param {number} count
   */
  generateMockPets(count = 10) {
    const pets = Array.from({ length: count }, () => ({
      _id: new mongoose.Types.ObjectId(),
      type: faker.helpers.arrayElement(PET_TYPES)
    }));
    return pets;
  }

  /**
   * POST generateData: genera users y pets para insertar REAL en Mongo
   * - users: password hasheada coder123
   * - role: 2 admin y el resto user si users >= 2 (si users < 2, los que existan serán admin primero)
   * - pets: owner requerido
   */
  async buildUsersForDB(usersCount) {
    const usedEmails = new Set();
    const hashedPassword = await this.hashDefaultPassword();

    const users = Array.from({ length: usersCount }, (_, idx) => ({
      email: buildUniqueEmail(usedEmails),
      password: hashedPassword,
      role: idx < Math.min(2, usersCount) ? "admin" : "user",
      pets: [] // se llenará luego vía update
    }));

    return users;
  }

  buildPetsForDB(petsCount, insertedUsers) {
    if (petsCount === 0) return [];

    // balanceado round-robin
    const pets = Array.from({ length: petsCount }, (_, idx) => {
      const owner = insertedUsers[idx % insertedUsers.length]._id;
      return {
        type: faker.helpers.arrayElement(PET_TYPES),
        owner
      };
    });

    return pets;
  }
}
