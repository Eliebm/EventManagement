import { Injectable } from '@angular/core';
import { User } from '../Models/user.Models';
import { BaseService } from './baseService/base.service';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  staticUser: User[] = [
    {
      id: 1,
      firstName: 'elie',
      lastName: 'lastname1',
      email: 'elie@hotmail.com',
      password: '123',
      location: '',
    },
    {
      id: 2,
      firstName: 'user2',
      lastName: 'lastname2',
      email: 'user2@hotmail.com',
      password: '123',
      location: '',
    },
  ];

  user: User[] = [];
  private storageKey: any;

  constructor(private baseService: BaseService, private router: Router) {
    this.storageKey = 'USERS';
  }

  setStaticData(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.staticUser));
  }

  private saveUsers(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.user));
  }

  generateUser(): void {
    let newId = this.baseService.generateAutoIncrementId(this.user);
    console.log(newId);
    this.user.push({
      id: newId,
      firstName: 'elie',
      lastName: 'dadas',
      email: '',
      password: '',
      location: '',
    });
    console.log(this.user);
    this.saveUsers();
  }

  deleteUser(userId: number): void {
    this.user = this.user.filter((x: any) => x.id !== userId);
    console.log(this.user);
  }

  loginUser(userEmail: string, userPassword: string): boolean {
    let email = userEmail.toLowerCase();
    let password = userPassword.toLocaleLowerCase();
    let valid;
    let data = localStorage.getItem(this.storageKey);
    if (data?.length) {
      this.user = JSON.parse(data);
    }

    let loginUser = this.user.filter(
      (x) => x.email === email && x.password === password
    );

    if (loginUser.length) {
      this.saveUserInfo(loginUser);
      valid = true;
    } else {
      valid = false;
    }

    return valid;
  }

  saveUserInfo(userInfo: any): void {
    let localStorageKey = 'loggedInUser';
    localStorage.setItem(localStorageKey, JSON.stringify(userInfo));
  }

  DeleteLoggedInUser(): void {
    let localStorageKey = 'loggedInUser';
    localStorage.removeItem(localStorageKey);
  }
}
