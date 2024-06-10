import { Injectable } from '@angular/core';
import { EventGroup } from '../Models/eventGroup.Models';
import { staticGroupEvent } from '../Models/staticData.Models';
import { User } from '../Models/user.Models';
import { BaseService } from './baseService/base.service';
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { EventClass } from '../Models/event.Models';

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
  saveEventGroup(data: any): void {
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

  isUserAdministrator(groupID: number, userId: number): boolean {
    let groupsList = this.getEventGroups();
    let group = groupsList.filter((x) => x.id == groupID);
    let admin = group[0].adminList;

    if (admin.filter((x) => x.id === userId)?.length) {
      return true;
    } else {
      return false;
    }
  }

  async fetchEventByGroupId(groupID: number): Promise<EventClass[]> {
    return new Promise<EventClass[]>((resolve) => {
      let groupsList = this.getEventGroups();
      let group = groupsList.filter((x) => x.id == groupID);
      let events = group[0].eventList;
      resolve(events);
    });
  }

  updateEventsOfEventGroup(groupId: number, data: any): void {
    let group = this.fetchEventGroupById(groupId);
    let eventList = group[0].eventList;
    eventList = eventList.filter((x) => x.id !== data[0].id);

    let newEventList = [...eventList, ...data];

    group[0].eventList = newEventList.sort((a, b) => a.id - b.id);
    this.saveEventGroup(this.eventGroups);
  }

  addUserToMembers(groupID: number, user: User[]): boolean {
    try {
      let group = this.fetchEventGroupById(groupID);
      let oldMemberList = group[0].members;
      group[0].members = [...oldMemberList, ...user];
      this.saveEventGroup(this.eventGroups);
    } catch (error) {
      return false;
    }

    return true;
  }

  checkIfUserIsAMember(groupId: number, userId: number): boolean {
    let groupInfo = this.eventGroups.filter((x) => x.id == groupId);
    let isJoin = groupInfo[0].members.filter((x) => x.id === userId);

    if (isJoin.length) {
      return true;
    }
    return false;
  }
}
