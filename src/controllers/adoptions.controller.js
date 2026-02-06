import { AdoptionsService } from "../services/adoptions.service.js";
import { assertObjectId } from "../utils/validation.js";

const service = new AdoptionsService();

export class AdoptionsController {
  static async getAll(req, res) {
    try {
      const data = await service.getAll();
      res.json({ status: "success", payload: data });
    } catch (err) {
      res.status(500).json({ status: "error", message: err.message });
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;
      assertObjectId(id);

      const adoption = await service.getOne(id);
      if (!adoption) return res.status(404).json({ status: "error", message: "Adoption not found" });

      res.json({ status: "success", payload: adoption });
    } catch (err) {
      res.status(err.statusCode || 500).json({ status: "error", message: err.message });
    }
  }

  static async create(req, res) {
    try {
      const { userId, petId } = req.body;
      if (!userId || !petId) {
        return res.status(400).json({ status: "error", message: "userId and petId are required" });
      }

      assertObjectId(userId);
      assertObjectId(petId);

      const result = await service.create({ userId, petId });
      if (result?.error) {
        return res.status(result.code).json({ status: "error", message: result.error });
      }

      res.status(201).json({
        status: "success",
        message: "Adoption created",
        payload: result.adoption
      });
    } catch (err) {
      res.status(err.statusCode || 500).json({ status: "error", message: err.message });
    }
  }

  static async remove(req, res) {
    try {
      const { id } = req.params;
      assertObjectId(id);

      const deleted = await service.remove(id);
      if (!deleted) return res.status(404).json({ status: "error", message: "Adoption not found" });

      res.json({ status: "success", message: "Adoption deleted", payload: deleted });
    } catch (err) {
      res.status(err.statusCode || 500).json({ status: "error", message: err.message });
    }
  }
}
