import { Router } from "express";
import { PetsController } from "../controllers/pets.controller.js";

const router = Router();

router.get("/", PetsController.getAll);
router.get("/:id", PetsController.getOne);
router.post("/", PetsController.create);
router.put("/:id", PetsController.update);
router.delete("/:id", PetsController.remove);

export default router;
