import * as carService from "../services/carService.js";

export const getAllCars = (req, res) => {
    res.json(carService.getAllCars());
};

export const getCarById = (req, res) => {
    const car = carService.getCarById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
};

export const createCar = (req, res) => {
    const result = carService.createCar(req.body);
    res.status(201).json({ id: result.lastInsertRowid });
};

export const updateCar = (req, res) => {
    carService.updateCar(req.params.id, req.body);
    res.json({ message: "Car updated" });
};

export const deleteCar = (req, res) => {
    carService.deleteCar(req.params.id);
    res.json({ message: "Car deleted" });
};


export const bulkInsertCars = (req, res) => {
    try {
        const inserted = carService.bulkInsertCars(req.body);
        res.status(201).json({ inserted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};