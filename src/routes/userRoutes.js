import express from "express";
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createUsersBulk
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.post("/bulk", createUsersBulk);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;