import express from 'express';
import { json } from 'express';
import userController from './controllers/userController.js';
import dealershipController from './controllers/controllers/dealershipController.js';
import createSchema from './schema.js';

const app = express();
const port = 3000;
app.use(json());
createSchema();

// User routess
app.get("/", (req, res) => {
  return res.json({ ok: "ok" })
})
app.post("/users/userSignup", userController.userSignup);
app.post("/users/userLogin", userController.UserLogin);

app.get("/users/cars", userController.getAllCars);
app.get(
  "/users/dealerships/:dealershipId/cars",
  userController.getAllCarsInDealership
);
app.get("/users/cars/:carId/dealerships", userController.getDealershipsWithCar);
app.get("/users/vehicles", userController.getAllVehiclesByUser);
app.get(
  "/users/dealerships/:latitude/:longitude/:distance",
  userController.getDealershipsWithinRange
);
app.get("/users/cars/:carId/deals", userController.getAllDealsOnCar);
app.get(
  "/users/dealerships/:dealershipId/deals",
  userController.getAllDealsFromDealership
);
app.post("/users/cars/:carId/buy", userController.buyCar);

// Dealership routes
app.get("/dealerships/cars", dealershipController.getAllCars);
app.get("/dealerships/cars/sold", dealershipController.getAllSoldCars);
app.post("/dealerships/cars", dealershipController.addCar);
app.get("/dealerships/deals", dealershipController.getAllDeals);
app.post("/dealerships/deals", dealershipController.addDeal);
app.get("/dealerships/vehicles/sold", dealershipController.getAllSoldVehicles);
app.post("/dealerships/vehicles/sold", dealershipController.addSoldVehicle);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
