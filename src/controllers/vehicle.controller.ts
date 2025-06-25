import express from "express";
import { Vehicle } from "../models/vehicle.model.ts";
import { Request, Response } from "express";
import { Brand } from "../models/brand.model.ts";


export const createVehicle = async (request: Request, response: Response) => {
  try {
    const newVehicle = new Vehicle(request.body);
    const savedVehicle = await newVehicle.save()
    response.status(201).json(
      { name: request.body }
    )
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
}

export const getVehicles = async (request: Request, response: Response) => {
  try {
    const getVehicle = await Vehicle.find();
    response.status(200).json(getVehicle);
  }
  catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

export const getOneVehicle = async (request: Request, response: Response) => {
  try {
    const foundVehicle = await Vehicle.findById(request.params.id);
    if (!foundVehicle) {
      response.status(404).json(`Vehicle with id ${request.params.id} not found`)
    }
    response.status(200).json({
      foundVehicle
    }
    );
  }
  catch (error) {
    response.status(500).json({ message: error.message })
  }
}

export const updateVehicle = async (request: Request, response: Response) => {
  try {

    const updateVehicle = await Vehicle.findByIdAndUpdate(request.params.id, request.body);
    const name = {
      name: Vehicle.name
    }
    if (!updateVehicle) {
      response.status(404).json(`Vehicle with ID ${request.params.id} not found!`)
    }


    response.status(201).json({
      name: request.body.name
    })
  }
  catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

export const deleteVehicle = async (request: Request, response: Response) => {
  try {
    const deleteVehicle = await Vehicle.findByIdAndDelete(request.params.id);
    if (!deleteVehicle) {
      response.status(404).json(`Vehicle with ID ${request.params.id} not found!`)
    }
    else { response.json(`Vehicle with ID ${request.params.id} deleted successfully!`) }
  }
  catch (error) {
    response.status(500).json({ message: error.message })
  }
}