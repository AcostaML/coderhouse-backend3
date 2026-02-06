import { MockingService } from "../services/mocking.service.js";
import { UsersService } from "../services/users.service.js";
import { PetsService } from "../services/pets.service.js";

const mockingService = new MockingService();
const usersService = new UsersService();
const petsService = new PetsService();

function parseNonNegativeNumber(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

export class MocksController {
  static async getMockingPets(req, res) {
    try {
      const count = req.query.count ? parseNonNegativeNumber(req.query.count) : 10;
      const safeCount = count === null ? 10 : Math.floor(count);

      const pets = mockingService.generateMockPets(safeCount);
      return res.json({ status: "success", payload: pets });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: "Failed to generate mocking pets",
        error: err.message
      });
    }
  }

  static async getMockingUsers(req, res) {
    try {
      const users = await mockingService.generateMockUsers50();
      return res.json({ status: "success", payload: users });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: "Failed to generate mocking users",
        error: err.message
      });
    }
  }

  static async generateData(req, res) {
    try {
      const users = parseNonNegativeNumber(req.body?.users);
      const pets = parseNonNegativeNumber(req.body?.pets);

      if (users === null || pets === null) {
        return res.status(400).json({
          status: "error",
          message: "Invalid body. Required: { users: number>=0, pets: number>=0 }"
        });
      }

      const usersCount = Math.floor(users);
      const petsCount = Math.floor(pets);

      // Si pides pets > 0 pero users = 0, no se puede porque Pet.owner es requerido
      if (petsCount > 0 && usersCount === 0) {
        return res.status(400).json({
          status: "error",
          message: "Cannot create pets when users=0 because Pet.owner is required."
        });
      }

      // 1) Build + insert users
      const usersToInsert = await mockingService.buildUsersForDB(usersCount);
      const insertedUsers = usersCount > 0 ? await usersService.createMany(usersToInsert) : [];

      // 2) Build + insert pets (con owner)
      const petsToInsert = mockingService.buildPetsForDB(petsCount, insertedUsers);
      const insertedPets = petsCount > 0 ? await petsService.createMany(petsToInsert) : [];

      // 3) Update users.pets con los ids insertados (bulk)
      if (insertedPets.length > 0) {
        const map = new Map(); // userId -> petIds[]
        for (const pet of insertedPets) {
          const ownerId = String(pet.owner);
          if (!map.has(ownerId)) map.set(ownerId, []);
          map.get(ownerId).push(pet._id);
        }

        const userPets = Array.from(map.entries()).map(([userId, petIds]) => ({
          userId,
          petIds
        }));

        await usersService.pushPetsToUsers(userPets);
      }

      return res.json({
        status: "success",
        message: "Data generated",
        insertedUsers: insertedUsers.length,
        insertedPets: insertedPets.length
      });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: "Failed to generate data",
        error: err.message
      });
    }
  }
}
