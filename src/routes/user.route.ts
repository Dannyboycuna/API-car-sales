import  express  from "express";
import { createUsers, deleteUserss, getUsers, getOneUsers, updateUsers } from "../controllers/users.controller.ts";
const usersRouter = express.Router();

usersRouter.post('/carusers', createUsers);
usersRouter.get('/carusers', getUsers);
usersRouter.delete('/carusers/:id', deleteUserss);
usersRouter.get('/carusers/:id', getOneUsers)
usersRouter.put('/carusers/:id', updateUsers)



export default usersRouter;