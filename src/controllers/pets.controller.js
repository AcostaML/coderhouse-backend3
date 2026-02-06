import { PetsService } from "../services/pets.service.js";
import { assertObjectId } from "../utils/validation.js";

const petsService = new PetsService();

export class PetsController {
  static async getAll(req, res) {
    try {
      const pets = await petsService.getAll();
      return res.json({ status: "success", payload: pets });
    } catch (err) {
      return res.status(500).json({ status: "error", message: "Failed to fetch pets", error: err.message });
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;
      assertObjectId(id);

      const pet = await petsService.getOne(id);
      if (!pet) return res.status(404).json({ status: "error", message: "Pet not found" });

      return res.json({ status: "success", payload: pet });
    } catch (err) {
      return res.status(err.statusCode || 500).json({ status: "error", message: err.message });
    }
  }

  static async create(req, res) {
    try {
      const { type, owner, name, age, specie } = req.body;

      if (!type || !owner) {
        return res.status(400).json({ status: "error", message: "type and owner are required" });
      }
      assertObjectId(owner);

      const created = await petsService.create({ type, owner, name, age, specie });
      return res.status(201).json({ status: "success", message: "Pet created", payload: created });
    } catch (err) {
      return res.status(err.statusCode || 500).json({ status: "error", message: err.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      assertObjectId(id);

      const update = req.body;
      if (update.owner) assertObjectId(update.owner);

      const updated = await petsService.update(id, update);
      if (!updated) return res.status(404).json({ status: "error", message: "Pet not found" });

      return res.json({ status: "success", message: "Pet updated", payload: updated });
    } catch (err) {
      return res.status(err.statusCode || 500).json({ status: "error", message: err.message });
    }
  }

  static async remove(req, res) {
    try {
      const { id } = req.params;
      assertObjectId(id);

      const deleted = await petsService.remove(id);
      if (!deleted) return res.status(404).json({ status: "error", message: "Pet not found" });

      return res.json({ status: "success", message: "Pet deleted", payload: deleted });
    } catch (err) {
      return res.status(err.statusCode || 500).json({ status: "error", message: err.message });
    }
  }
}
