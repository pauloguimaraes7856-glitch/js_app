import {
    getAllUsersWithCars as getAllUsersService,
    getUserById as getUserByIdService,
    createUser as createUserService,
    updateUser as updateUserService,
    deleteUser as deleteUserService
} from "../services/userService.js";



export const getAllUsers = (req, res) => {
    try {
        const users = getAllUsersService();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const getUserById = (req, res) => {
    try {
        const { id } = req.params;
        const user = getUserByIdService(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const createUser = (req, res) => {
    try {
        const { name, email, car_id } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        const newUser = createUserService({ name, email, car_id });
        res.status(201).json(newUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const updateUser = (req, res) => {
    try {
        const { id } = req.params;
        const updated = updateUserService(id, req.body);

        if (!updated) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updated);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const deleteUser = (req, res) => {
    try {
        const { id } = req.params;
        const deleted = deleteUserService(id);

        if (!deleted) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(204).send();

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};