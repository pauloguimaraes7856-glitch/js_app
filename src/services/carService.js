import { getDb } from "../config/database.js";

export const getAllCars = () => {
    const db = getDb();
    return db.prepare("SELECT * FROM cars ORDER BY id").all();
};

export const getCarById = (id) => {
    const db = getDb();
    return db.prepare("SELECT * FROM cars WHERE id = ?").get(id);
};

export const createCar = (car) => {
    const db = getDb();
    return db.prepare(`
        INSERT INTO cars (brand, model, year)
        VALUES (?, ?, ?)
    `).run(car.brand, car.model, car.year);
};

export const updateCar = (id, car) => {
    const db = getDb();
    return db.prepare(`
        UPDATE cars
        SET brand = ?, model = ?, year = ?
        WHERE id = ?
    `).run(car.brand, car.model, car.year, id);
};

export const deleteCar = (id) => {
    const db = getDb();
    return db.prepare("DELETE FROM cars WHERE id = ?").run(id);
};


export const bulkInsertCars = (carsArray) => {
    const db = getDb();
    const stmt = db.prepare(
        "INSERT INTO cars (brand, model, year) VALUES (?, ?, ?)"
    );

    let count = 0;

    const insertMany = db.transaction((cars) => {
        cars.forEach(c => {
            stmt.run(c.brand, c.model, c.year);
            count++;
        });
    });

    insertMany(carsArray);
    return count;
};