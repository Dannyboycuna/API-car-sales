import express from "express";
import { Customers } from "../models/customer.model.ts";
import { Vehicle } from "../models/vehicle.model.ts";
import { Response, Request } from "express";

export const createCustomers = async (request: Request, response: Response) => {
  try {
    const newCustomers = new Customers(request.body);
    const savedCustomers = await newCustomers.save()
    response.status(201).json(request.body)
  }
  catch (error) {
    if (error.code === 11000) {
  return response.json({message:'customer already registered!'})
}

    return response.status(500).json({message: error.message})
  }
}

export const getCustomers = async (request: Request, response: Response) => {
  Customers.find()
    .then((customerss: any) => {
      response.status(200).json(customerss)
    })
    .catch((error: { message: any; }) => {
      response.status(500).json({ message: error.message })
    })

};

export const deleteCustomerss = async (request: Request, response: Response) => {
  try {
    const removeCustomers = await Customers.findByIdAndDelete(request.params.id);
    if (!removeCustomers) {
      return response.status(404).json('Customers not found!')
    }
    response.json(`Deleted ${request.params.id}`)
  }
  catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

export const getOneCustomers = async (request: Request, response: Response) => {
  try {
    const customersFound = await Customers.findById(request.params.id);
    if (!customersFound) {
      response.status(404).json(`Customers with id ${request.params.id} not found!`);
    }
    const _vehicle = await Vehicle.findById(customersFound.vehicleId)
    return response.status(200).json({
      customersFound,
      Vehicle: _vehicle || null
    })
  }
  catch(error) {
    return response.status(500).json({message: error.message})
  }
}

export const updateCustomers = async (request: Request, response: Response) => {
  const  name  = {
    name:Customers.name
  }
  const updatedCustomers = await Customers.findByIdAndUpdate(request.params.id, request.body);
  response.status(201).json({
    name: request.body.name
  });
  if (!updatedCustomers) {
    response.status(404).json(`Customers with id ${request.params.id} not found!` )
  }
}

export default {
  getCustomers,
  createCustomers,
  deleteCustomerss,
  getOneCustomers,
  updateCustomers
}