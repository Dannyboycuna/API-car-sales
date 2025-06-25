import  express  from "express";
import { createCustomers, deleteCustomerss, getCustomers, getOneCustomers, updateCustomers } from "../controllers/customer.controller.ts";
const customersRouter = express.Router();

customersRouter.post('/customers', createCustomers);
customersRouter.get('/customers', getCustomers);
customersRouter.delete('/customers/:id', deleteCustomerss);
customersRouter.get('/customers/:id', getOneCustomers)
customersRouter.put('/customers/:id', updateCustomers)



export default customersRouter;