import db from "../config/database.js";

export const getAllCars = () => {
    return db.prepare("SELECT * FROM cars").all();
};

export const getCarById = (id) => {
    return db.prepare("SELECT * FROM cars WHERE id = ?").get(id);
};

export const createCar = (car) => {
    const stmt = db.prepare(`
        INSERT INTO cars (brand, model, year)
        VALUES (?, ?, ?)
    `);
    return stmt.run(car.brand, car.model, car.year);
};

export const updateCar = (id, car) => {
    const stmt = db.prepare(`
        UPDATE cars
        SET brand = ?, model = ?, year = ?
        WHERE id = ?
    `);
    return stmt.run(car.brand, car.model, car.year, id);
};

export const deleteCar = (id) => {
    return db.prepare("DELETE FROM cars WHERE id = ?").run(id);
};