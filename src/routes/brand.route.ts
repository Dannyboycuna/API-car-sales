import  express  from "express";
import { addVvehicleToBrand, createBrand, deleteBrands, getBrand, getOneBrand, removeVehicleFromBrand, updateBrand } from "../controllers/brand.controller.ts";
const brandRouter = express.Router();

brandRouter.post('/brand', createBrand);
brandRouter.get('/brand', getBrand);
brandRouter.delete('/brand/:id', deleteBrands);
brandRouter.get('/brand/:id', getOneBrand);
brandRouter.put('/brand/:id', updateBrand);
brandRouter.post('/brand/addVehicleToBrand', addVvehicleToBrand);
brandRouter.delete('/brand/rvfb/:brandId/:vehicleId', removeVehicleFromBrand);



export default brandRouter;