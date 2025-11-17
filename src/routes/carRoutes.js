import express from "express";
import * as carController from "../controllers/carController.js";
import { validateApiKey } from "../middleware/apiKey.js";

const router = express.Router();

router.get("/", validateApiKey, carController.getAllCars);
router.get("/:id", validateApiKey, carController.getCarById);
router.post("/", validateApiKey, carController.createCar);
router.put("/:id", validateApiKey, carController.updateCar);
router.delete("/:id", validateApiKey, carController.deleteCar);

export default router;