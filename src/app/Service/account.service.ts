import { Injectable } from '@angular/core';
import { User } from '../Models/user.Models';
import { BaseService } from './baseService/base.service';
import { Route, Router } from '@angular/router';
import { staticUser } from '../Models/staticData.Models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  staticUser: User[] = staticUser;

  user: User[] = [];
  private storageKey: any;

  constructor(private baseService: BaseService, private router: Router) {
    this.storageKey = 'USERS';
  }

  setStaticData(): void {
    if (!localStorage.getItem(this.storageKey)?.length) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.staticUser));
    }
  }

  private saveUsers(data: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }
  // add new user
  generateUser(data: any): boolean {
    let fetchedUser = localStorage.getItem(this.storageKey);

    this.user = this.fetchUsers();

    if (this.user.filter((x) => x.email === data.email).length) {
      return false;
    } else {
      let newId = this.baseService.generateAutoIncrementId(this.user);

      data.id = newId;

      this.user.push(data);

      this.saveUsers(this.user);
      return true;
    }
  }

  fetchUsers(): User[] {
    this.storageKey = 'USERS';

    let data = localStorage.getItem(this.storageKey);

    if (data) {
      this.user = JSON.parse(data);
    }
    return this.user;
  }

  fetchSignedInUserInfo(): User[] {
    let data = localStorage.getItem('loggedInUser');
    if (data) {
      this.user = JSON.parse(data);
    }
    return this.user;
  }

  deleteUser(userId: number): void {
    this.user = this.user.filter((x: any) => x.id !== userId);
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
