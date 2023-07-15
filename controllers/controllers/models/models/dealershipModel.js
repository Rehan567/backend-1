import { ObjectId } from 'mongodb';

export default class Dealership {
  constructor(name, location) {
    this._id = new ObjectId();
    this.name = name;
    this.location = location;
  }
}

