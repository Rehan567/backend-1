import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';
import { withTransaction } from '../../db.js';

function generateDummyData() {
  const cars = [];
  const dealerships = [];
  const deals = [];
  const vehicles = [];

  // Generate dummy data using faker.js

  return { cars, dealerships, deals, vehicles };
}

export default {
  getAllCars: async (req, res) => {
    try {
      // Fetch all cars from the database
      res.json({ success: true, cars });
    } catch (error) {
      console.error('Error fetching cars', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  getAllSoldCars: async (req, res) => {
    try {
      // Fetch all sold cars by the dealership from the database
      res.json({ success: true, cars });
    } catch (error) {
      console.error('Error fetching sold cars', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  addCar: async (req, res) => {
    try {
      const { dealershipId } = req.params;

      await withTransaction(async (session) => {
        // Add the car to the specified dealership in the database

        res.json({ success: true, message: 'Car added successfully' });
      });
    } catch (error) {
      console.error('Error adding car', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  getAllDeals: async (req, res) => {
    try {
      // Fetch all deals provided by the dealership from the database
      res.json({ success: true, deals });
    } catch (error) {
      console.error('Error fetching deals', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  addDeal: async (req, res) => {
    try {
      const { dealershipId } = req.params;

      await withTransaction(async (session) => {
        // Add the deal to the specified dealership in the database

        res.json({ success: true, message: 'Deal added successfully' });
      });
    } catch (error) {
      console.error('Error adding deal', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  getAllSoldVehicles: async (req, res) => {
    try {
      // Fetch all vehicles sold by the dealership from the database
      res.json({ success: true, vehicles });
    } catch (error) {
      console.error('Error fetching sold vehicles', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  addSoldVehicle: async (req, res) => {
    try {
      const { dealershipId } = req.params;

      await withTransaction(async (session) => {
        // Add the sold vehicle to the dealership in the database

        res.json({ success: true, message: 'Sold vehicle added successfully' });
      });
    } catch (error) {
      console.error('Error adding sold vehicle', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
};
