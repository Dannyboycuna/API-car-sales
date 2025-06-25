import express, { Router } from 'express';
import mongoose from 'mongoose';
import brandRouter from './routes/brand.route.ts';
import vehicleRoute from './routes/vehicle.route.ts';
import cors from "cors";
import usersRouter from './routes/user.route.ts';
import customersRouter from './routes/customer.route.ts';

const app = express();
app.use(cors());
app.use(cors({ origin: 'http://localhost:4200' }));

const PORT = 3000;


app.use(express.json());
app.use('/carsale', brandRouter);
app.use('/carsale', vehicleRoute);
app.use('/carsale', usersRouter);
app.use('/carsale', customersRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose.connect("mongodb+srv://Dannyboy:Dannyboy@cluster0.nr7twq4.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });