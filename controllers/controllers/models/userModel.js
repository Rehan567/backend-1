import { ObjectId } from 'mongodb';

export default class User {
  constructor(firstName, lastName, email, password) {
    this._id = new ObjectId();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}


