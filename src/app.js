import express from "express";

import mocksRouter from "./routes/mocks.router.js";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionRouter from "./routes/adoption.router.js";
import { setupSwagger } from "./config/swagger.js";

export function buildApp() {
  const app = express();
  app.use(express.json());

  app.get("/health", (req, res) => {
    res.json({ status: "success", message: "OK" });
  });

  setupSwagger(app);

  app.use("/api/mocks", mocksRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/pets", petsRouter);
  app.use("/api/adoptions", adoptionRouter);

  return app;
}
