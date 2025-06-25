import express from "express";
import { createVehicle, deleteVehicle, getOneVehicle, getVehicles, updateVehicle } from "../controllers/vehicle.controller.ts";
const vehicleRoute = express.Router()

vehicleRoute.post('/vehicle', createVehicle);
vehicleRoute.get('/vehicle', getVehicles);
vehicleRoute.get('/vehicle/:id', getOneVehicle);
vehicleRoute.put('/vehicle/:id', updateVehicle);
vehicleRoute.delete('/vehicle/:id', deleteVehicle)

export default vehicleRoute;