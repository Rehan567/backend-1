import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';
import { withTransaction } from '../db.js';
import 'dotenv/config'
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';




function generateDummyData() {
  const cars = [];
  const dealerships = [];
  const deals = [];
  const vehicles = [];

  // Generate dummy data using faker.js

  return { cars, dealerships, deals, vehicles };
}

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useUnifiedTopology: true });
const dbName = 'nerve';
const collectionName = 'users';

export default {

  // User Registration (Sign Up)
  userSignup: async (req, res) => {
    const { email, password, location, info } = req.body;
    try {
      await client.connect();
      const db = client.db(dbName);

      // Check if user with the same email already exists
      const existingUser = await db.collection("user").findOne({ email });
      if (existingUser) {
        res.status(409).json({ error: 'User with the same email already exists' });
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const newUser = {
        email,
        password: hashedPassword,
        location,
        info,
        vehicle_info: []
      };

      const result = await db.collection("user").insertOne(newUser);
      res.status(201).json({ id: result.insertedId });
    } catch (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      await client.close();
    }
  }
  ,
  // User Login
  UserLogin: async (req, res) => {
    const { email, password } = req.body;
    try {
      await client.connect();
      const db = client.db(dbName);

      // Find the user by email
      const user = await db.collection("user").findOne({ email });
      if (!user) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }

      // Compare the passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
      console.log(token);



      // Successful login
      return res.json(token);
    } catch (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      await client.close();
    }
  },

  // User Logout
  Userlogout: (req, res) => {
    // Perform any necessary logout operations 
    res.sendStatus(200);
  },


  getAllCars: async (req, res) => {
    try {
      // Fetch all cars from the database
      res.json({ success: true, cars });
    } catch (error) {
      console.error('Error fetching cars', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  getAllCarsInDealership: async (req, res) => {
    try {
      const { dealershipId } = req.params;

      // Fetch all cars in the specified dealership from the database
      res.json({ success: true, cars });
    } catch (error) {
      console.error('Error fetching cars in dealership', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  getDealershipsWithCar: async (req, res) => {
    try {
      const { carId } = req.params;

      // Fetch all dealerships with the specified car from the database
      res.json({ success: true, dealerships });
    } catch (error) {
      console.error('Error fetching dealerships with car', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  getAllVehiclesByUser: async (req, res) => {
    try {
      const { userId } = req.user;

      // Fetch all vehicles owned by the user from the database
      res.json({ success: true, vehicles });
    } catch (error) {
      console.error('Error fetching vehicles by user', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  getDealershipsWithinRange: async (req, res) => {
    try {
      const { latitude, longitude, distance } = req.params;

      // Fetch all dealerships within the specified range based on user location
      res.json({ success: true, dealerships });
    } catch (error) {
      console.error('Error fetching dealerships within range', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  getAllDealsOnCar: async (req, res) => {
    try {
      const { carId } = req.params;

      // Fetch all deals on the specified car from the database
      res.json({ success: true, deals });
    } catch (error) {
      console.error('Error fetching deals on car', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  getAllDealsFromDealership: async (req, res) => {
    try {
      const { dealershipId } = req.params;

      // Fetch all deals from the specified dealership from the database
      res.json({ success: true, deals });
    } catch (error) {
      console.error('Error fetching deals from dealership', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  buyCar: async (req, res) => {
    try {
      const { carId } = req.params;
      const { userId } = req.user;

      console.log(carId, userId)
      await withTransaction(async (session) => {
        // Perform the purchase operation and update the database accordingly

        res.json({ success: true, message: 'Car purchased successfully' });
      });
    } catch (error) {
      console.error('Error buying car', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
};
