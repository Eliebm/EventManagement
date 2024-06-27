import { Injectable } from '@angular/core';
import { User } from '../Models/user.Models';
import { BaseService } from './baseService/base.service';
import { Route, Router } from '@angular/router';
import { staticUser } from '../Models/staticData.Models';
import { EventGroup } from '../Models/eventGroup.Models';
import { EventClass } from '../Models/event.Models';
import { EventServicesService } from './event-services.service';
import { EventGroupsService } from './event-groups.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  staticUser: User[] = staticUser;

  user: User[] = [];
  private storageKey: any;

  constructor(
    private baseService: BaseService,
    private router: Router,
    private eventService: EventServicesService
  ) {
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

  changeUserPasswordByUserId(userId: number, newPass: string): boolean {
    try {
      let users = this.fetchUsers();
      let userInfo = users.filter((user) => user.id == userId);
      userInfo[0].password = newPass;
      console.log(userInfo[0]);

      this.saveUsers(users);
      this.saveUserInfo(userInfo);
      return true;
    } catch (error) {
      return false;
    }
  }

  fetchGroupsByUserId(userId: number): any {
    let groupsData = localStorage.getItem('Groups-Of-Events');
    let groupsList: EventGroup[] = [];
    if (groupsData) {
      groupsList = JSON.parse(groupsData);
    }

    let id = userId;
    let fetchedList: any = [];
    groupsList.forEach((x) => {
      if (x.adminList.find((u) => u.id === id)) {
        fetchedList.push(x);
      }
    });

    return fetchedList;
  }

  fetchEventsByUserId(userId: number): any {
    let eventsData = localStorage.getItem('All-Events');
    let eventList: EventClass[] = [];
    if (eventsData) {
      eventList = JSON.parse(eventsData);
    }

    let id = userId;
    let fetchList: any = [];
    eventList.forEach((item) => {
      if (item.hostList.find((x) => x.id === id)) {
        fetchList.push(item);
      }
    });

    return fetchList;
  }

  async deleteGroupAndAssociatedEvents(groupId: number) {
    let groupsData = localStorage.getItem('Groups-Of-Events');
    let groupsList: EventGroup[] = [];
    if (groupsData) {
      groupsList = JSON.parse(groupsData);
    }
    let groupInfo = groupsList.filter((x) => x.id === groupId);
    let events = groupInfo[0].eventList;

    for (let event of events) {
      try {
        const response = await this.removeAllGroupEvents(event.id);
        if (response === false) {
          return;
        }
      } catch (error) {}
    }
  }

  async removeAllGroupEvents(eveID: number) {
    return await new Promise((resolve, reject) => {
      let response = this.eventService.deleteEvent(eveID);
      setTimeout(() => {
        if (response === true) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  }
}
