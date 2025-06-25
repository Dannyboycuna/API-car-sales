import express from "express";
import { Users } from "../models/user.model.ts";
import { Response, Request } from "express";

export const createUsers = async (request: Request, response: Response) => {
  try {
    const newUsers = new Users(request.body);
    const savedUsers = await newUsers.save()
    response.status(201).json(request.body)
  }
  catch (error) {

    if (error.code===11000) {
      response.json({message:'user already registered!'})
    }
    return response.status(500).json({message: error.message})
  }
}

export const getUsers = async (request: Request, response: Response) => {
  Users.find({}).select('_id username email password')
    .then((userss: any) => {
      response.status(200).json(userss)
    })
    .catch((error: { message: any; }) => {
      response.status(500).json({ message: error.message })
    })

};

export const deleteUserss = async (request: Request, response: Response) => {
  try {
    const removeUsers = await Users.findByIdAndDelete(request.params.id);
    if (!removeUsers) {
      return response.status(404).json('Users not found!')
    }
    response.json(`Deleted ${request.params.id}`)
  }
  catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

export const getOneUsers = async (request: Request, response: Response) => {
  try {
    const usersFound = await Users.findById(request.params.id);
    if (!usersFound) {
      response.status(404).json(`Users with id ${request.params.id} not found!`);
    }
    return response.status(200).json(usersFound)
  }
  catch(error) {
    return response.status(500).json({message: error.message})
  }
}

export const updateUsers = async (request: Request, response: Response) => {
  const  name  = {
    name:Users.name
  }
  const updatedUsers = await Users.findByIdAndUpdate(request.params.id, request.body);
  response.status(201).json({
    name: request.body.name
  });
  if (!updatedUsers) {
    response.status(404).json(`Users with id ${request.params.id} not found!` )
  }
}

export default {
  getUsers,
  createUsers,
  deleteUserss,
  getOneUsers,
  updateUsers
}