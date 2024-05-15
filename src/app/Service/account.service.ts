import { Injectable } from '@angular/core';
import { User } from '../Models/user.Models';
import { BaseService } from './baseService/base.service';

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

  constructor(private baseService: BaseService) {
    this.storageKey = 'USERS';

    let data = localStorage.getItem(this.storageKey);
    if (data) {
      this.user = JSON.parse(data);
    }
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
}
