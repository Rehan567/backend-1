import { MongoClient } from 'mongodb';
import 'dotenv/config'

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
    return client.db();
  } catch (error) {
    console.error('Failed to connect to the database', error);
    throw error;
  }
}

export async function withTransaction(callback) {
  const session = client.startSession();
  session.startTransaction();

  try {
    await callback(session);
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    console.error('Error during transaction', error);
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}
