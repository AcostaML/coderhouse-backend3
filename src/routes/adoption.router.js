import { Router } from "express";
import { AdoptionsController } from "../controllers/adoptions.controller.js";

const router = Router();

router.get("/", AdoptionsController.getAll);
router.get("/:id", AdoptionsController.getOne);
router.post("/", AdoptionsController.create);
router.delete("/:id", AdoptionsController.remove);

export default router;
