import { Brand } from "../models/brand.model.ts";
import { Response, Request } from "express";
import { Vehicle } from "../models/vehicle.model.ts";
import { VehicleToBrand } from "../models/vehicleToBrand.model.ts";

export const createBrand = async (request: Request, response: Response) => {
  try {
    const newBrand = new Brand(request.body);
    const savedBrand = await newBrand.save()
    response.status(201).json(request.body)
  }
  catch (error) {
    if (error.code === 11000) {
      return response.json({ message: 'Brand already exists!' })
    }
    return response.status(500).json({ message: error.message })
  }
}

export const getBrand = async (request: Request, response: Response) => {
  Brand.find()
    .then((brands: any) => {
      response.status(200).json(brands)
    })
    .catch((error: { message: any; }) => {
      response.status(500).json({ message: error.message })
    })

};

export const deleteBrands = async (request: Request, response: Response) => {
  try {
    const removeBrand = await Brand.findByIdAndDelete(request.params.id);
    if (!removeBrand) {
      return response.status(404).json('Brand not found!')
    }
    response.json(`Deleted ${request.params.id}`)
  }
  catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

export const getOneBrand = async (request: Request, response: Response) => {
  try {
    const brandFound = await Brand.findById(request.params.id);
    if (!brandFound) {
      return response.status(404).json({ message: `Brand with id ${request.params.id} not found!` });
    }

    const vehicles = await VehicleToBrand.find({ brandId: brandFound._id }).populate('vehicleId');

    return response.status(200).json({ brandFound, vehicles });
  }
  catch (error) {
    return response.status(500).json({ message: error.message });
  }
}


export const updateBrand = async (request: Request, response: Response) => {
  const name = {
    name: Brand.name
  }
  const updatedBrand = await Brand.findByIdAndUpdate(request.params.id, request.body);
  response.status(201).json({
    name: request.body.name
  });
  if (!updatedBrand) {
    response.status(404).json(`Brand with id ${request.params.id} not found!`)
  }
}

export const addVvehicleToBrand = async (request: Request, response: Response) => {
  try {
    const { brandId, vehicleId } = request.body;

    console.log('brand received:', brandId);
    console.log('vehicle received: ', vehicleId)

    const brand = await Brand.findById(brandId);
    if (!brand) {
      return response.status(404).json({ message: 'Brand not found!' })
    }
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return response.status(404).json({ message: 'vehicle not found!' })
    }
    else {
      const vehicleToBrand = new VehicleToBrand({
        brandId: brandId,
        vehicleId: vehicleId
      })
      await vehicleToBrand.save()
      return response.status(201).json({
        brand: brandId,
        vehicle: vehicleId
      })
    }
  }
  catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

export const removeVehicleFromBrand = async (request: Request, response: Response) => {
  try {
    const brandId = request.params.brandId;
    const vehicleId = request.params.vehicleId;
    console.log(`BrandId: `, brandId);
    console.log(`Vehicle Id: `, vehicleId)

    const deletedVehicle= await VehicleToBrand.findOneAndDelete({ brandId: brandId, vehicleId: vehicleId })
    if (!brandId) {
      response.status(404).json({ message: 'Brand not found!' })
    }
    else if (!deletedVehicle) { 
      response.status(404).json({ message: 'Vehicle not found!' })
    }
    
    
      response.status(200).json({message: `Removed vehicle with id ${request.params.vehicleId} from this brand.`})
    
  }
  catch (error) {
    response.status(500).json({ message: error.message })
  }
}


export default {
  getBrand,
  createBrand,
  deleteBrands,
  getOneBrand,
  updateBrand
}