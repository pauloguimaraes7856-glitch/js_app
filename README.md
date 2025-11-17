 Car Dealership Internal API

REST API for managing customers and their vehicles

This project is a simple internal REST API designed for a car dealership company.
It allows internal staff to:
	•	Manage customers
	•	Manage cars
	•	Automatically link customers to their cars
	•	View customer + car information in a unified dashboard
	•	Perform bulk insertion for large data imports

A clean public-facing dashboard is available and auto-refreshes from the API.

Live Demo

Frontend Dashboard -> https://js-app-lted.onrender.com
API Base URL ->  https://js-app-lted.onrender.com

API Key (required for all protected routes) -> x-api-key: 1234


Tech Stack
	•	Node.js (ES Modules)
	•	Express.js
	•	SQLite
	•	Custom Model Layer
	•	Render deployment
	•	Static HTML Frontend


PROJECT STRUCTURE
  src/
 ├─ config/
 │   ├─ config.js
 │   └─ database.js
 ├─ models/
 │   ├─ User.js
 │   └─ Car.js
 ├─ controllers/
 │   ├─ userController.js
 │   └─ carController.js
 ├─ services/
 │   ├─ userService.js
 │   └─ carService.js
 ├─ routes/
 │   ├─ userRoutes.js
 │   └─ carRoutes.js
 ├─ middleware/
 │   ├─ apiKey.js
 │   └─ logger.js
 └─ index.js
public/
 └─ index.html

Authentication

All protected endpoints require the header: x-api-key: 1234
If missing → 401 API key missing
If incorrect → 403 Invalid API key

Running Locally
	1.	Clone repository
git clone https://github.com/pauloguimaraes7856-glitch/js_app.git
	2.	Install dependencies
npm install
	3.	Start server
npm start

The API runs on:
http://localhost:3000

Endpoints

— Health Check —
GET /healthz

⸻

Users Endpoints

GET /users
Headers: x-api-key: 1234
Returns all users with their assigned car.

GET /users/:id
Headers: x-api-key: 1234

POST /users
Headers: x-api-key: 1234
Body example:
{
“name”: “John Doe”,
“email”: “john@example.com”,
“car_id”: 3
}

POST /users/bulk
Headers: x-api-key: 1234
Body example:
[
{ “name”: “User A”, “email”: “a@test.com”, “car_id”: 1 },
{ “name”: “User B”, “email”: “b@test.com”, “car_id”: 2 }
]

PATCH /users/:id
Headers: x-api-key: 1234

DELETE /users/:id
Headers: x-api-key: 1234

⸻

Cars Endpoints

GET /cars
Headers: x-api-key: 1234

GET /cars/:id
Headers: x-api-key: 1234

POST /cars
Headers: x-api-key: 1234
Body example:
{
“brand”: “Tesla”,
“model”: “Model 3”,
“year”: 2023
}

POST /cars/bulk
Headers: x-api-key: 1234
Body example:
[
{ “brand”: “BMW”, “model”: “M5”, “year”: 2020 },
{ “brand”: “Audi”, “model”: “A6”, “year”: 2021 }
]

PATCH /cars/:id
Headers: x-api-key: 1234

DELETE /cars/:id
Headers: x-api-key: 1234

⸻

Frontend Dashboard
The public dashboard displays customers and their cars.
URL:
https://js-app-lted.onrender.com

⸻

Business Context
This API is designed as an internal tool for a car dealership.
Employees can:
	•	View all customers
	•	View all cars
	•	See which customer owns which car
	•	Insert data in bulk
	•	Maintain a clean lightweight system

⸻

Notes
	•	Database is SQLite
	•	Tables auto-create on startup
	•	Seeds include example cars and users
	•	Bulk import is supported
	•	API key provides basic internal security

⸻

If you need improvements: sorting, filtering, a stats route, or a better dashboard, it can be added easily.
