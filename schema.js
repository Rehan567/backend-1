import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function createSchema() {
    try {
        await client.connect();
        const db = client.db('nerve');

        // Admin Collection
        const adminCollection = db.collection('admin');
        await adminCollection.createIndex({ admin_id: 1 }, { unique: true });

        // User Collection
        const userCollection = db.collection('user');
        await userCollection.createIndex({ user_email: 1 }, { unique: true });
        await userCollection.createIndex({ user_id: 1 }, { unique: true });
        await userCollection.createIndex({ 'vehicle_info.vehicle_id': 1 });

        // Dealership Collection
        const dealershipCollection = db.collection('dealership');
        await dealershipCollection.createIndex({ dealership_email: 1 }, { unique: true });
        await dealershipCollection.createIndex({ dealership_id: 1 }, { unique: true });
        await dealershipCollection.createIndex({ 'deals.deal_id': 1 });
        await dealershipCollection.createIndex({ 'cars.car_id': 1 });
        await dealershipCollection.createIndex({ 'sold_vehicles.vehicle_id': 1 });

        // Deal Collection
        const dealCollection = db.collection('deal');
        await dealCollection.createIndex({ deal_id: 1 }, { unique: true });
        await dealCollection.createIndex({ car_id: 1 });

        // Cars Collection
        const carsCollection = db.collection('cars');
        await carsCollection.createIndex({ car_id: 1 }, { unique: true });

        // Sold Vehicles Collection
        const soldVehiclesCollection = db.collection('sold_vehicles');
        await soldVehiclesCollection.createIndex({ vehicle_id: 1 }, { unique: true });
        await soldVehiclesCollection.createIndex({ car_id: 1 });

        console.log('Schema created successfully.');
    } catch (err) {
        console.error('Error creating schema:', err);
    } finally {
        await client.close();
    }
}


export default createSchema