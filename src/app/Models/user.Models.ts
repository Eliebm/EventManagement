import { BaseClass } from './baseClass.Models';

export class User extends BaseClass {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    location: string
  ) {
    super(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.location = location;
  }
}
