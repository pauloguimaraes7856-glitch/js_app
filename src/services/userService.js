import User from "../models/User.js";

export const getAllUsersWithCars = () => {
    return User.findAll();
};

export const getUserById = (id) => {
    return User.findById(id);
};

export const createUser = (data) => {
    return User.create(data);
};

export const createUsersBulk = (users) => {
    return User.insertMany(users);
};

export const updateUser = (id, data) => {
    return User.update(id, data);
};

export const deleteUser = (id) => {
    return User.delete(id);
};