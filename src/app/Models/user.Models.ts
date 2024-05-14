import { BaseClass } from './baseClass.Models';

export class User extends BaseClass {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    super(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
export function deleteUser(id: number, obj: any) {
  let user;
  user = obj.filter((x: any) => x.id !== id);
  return user;
}
