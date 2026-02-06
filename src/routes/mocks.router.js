import { Router } from "express";
import { MocksController } from "../controllers/mocks.controller.js";

const router = Router();

router.get("/mockingpets", MocksController.getMockingPets);
router.get("/mockingusers", MocksController.getMockingUsers);
router.post("/generateData", MocksController.generateData);

export default router;
