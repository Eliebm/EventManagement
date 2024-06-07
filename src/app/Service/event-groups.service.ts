import { Injectable } from '@angular/core';
import { EventGroup } from '../Models/eventGroup.Models';
import { staticGroupEvent } from '../Models/staticData.Models';
import { User } from '../Models/user.Models';
import { BaseService } from './baseService/base.service';
import { Router } from '@angular/router';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class EventGroupsService {
  protected staticEventGroups: EventGroup[] = staticGroupEvent;
  private storageKey: any;
  user: User[] = [];
  eventGroups!: EventGroup[];

  constructor(
    private baseService: BaseService,
    private router: Router,
    private accountService: AccountService
  ) {
    this.storageKey = 'Groups-Of-Events';
  }

  setStaticData(): void {
    if (!localStorage.getItem(this.storageKey)?.length) {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.staticEventGroups)
      );
    }
  }
  private saveEventGroup(data: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getEventGroups(): EventGroup[] {
    this.storageKey = 'Groups-Of-Events';
    let data = localStorage.getItem(this.storageKey);

    if (data) {
      this.eventGroups = JSON.parse(data);
    }
    return this.eventGroups;
  }

  fetchEventGroupById(groupId: number): EventGroup[] {
    let data = this.getEventGroups();
    return data.filter((x) => x.id == groupId);
  }

  addAdministratorToEventGroup(eventID: number, userEmail: string): string {
    let users = this.accountService.fetchUsers();
    let user = users.filter((x) => x.email == userEmail);
    if (!user?.length) {
      return 'error';
    }

    let groupsList = this.getEventGroups();
    let group = groupsList.filter((x) => x.id == eventID);

    let oldAdminList = group[0].adminList;

    if (oldAdminList.filter((x) => x.email == userEmail)?.length) {
      return 'false';
    } else {
      group[0].adminList = [...oldAdminList, ...user];

      this.saveEventGroup(this.eventGroups);
      return 'true';
    }
  }

  isUserAdministrator(eventID: number, userId: number): boolean {
    let groupsList = this.getEventGroups();
    let group = groupsList.filter((x) => x.id == eventID);
    let admin = group[0].adminList;

    if (admin.filter((x) => x.id === userId)?.length) {
      return true;
    } else {
      return false;
    }
  }
}
