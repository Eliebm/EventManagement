import { Injectable } from '@angular/core';
import { EventGroup } from '../Models/eventGroup.Models';
import { staticGroupEvent } from '../Models/staticData.Models';
import { User } from '../Models/user.Models';
import { BaseService } from './baseService/base.service';
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { EventClass } from '../Models/event.Models';
import { EventServicesService } from './event-services.service';

@Injectable({
  providedIn: 'root',
})
export class EventGroupsService {
  protected staticEventGroups: EventGroup[] = staticGroupEvent;
  private storageKey: any;
  user: User[] = [];
  eventGroups!: EventGroup[];

  constructor(private baseService: BaseService, private router: Router) {
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

  getAllUsers(): User[] {
    this.storageKey = 'USERS';
    let data = localStorage.getItem(this.storageKey);
    let users;
    if (data) {
      users = JSON.parse(data);
    }
    return users;
  }

  addNewGroup(receivedGroupData: any): boolean {
    let groups = this.getEventGroups();
    let newId = this.baseService.generateAutoIncrementId(groups);
    let newGroup: EventGroup;
    try {
      newGroup = {
        id: newId,
        title: receivedGroupData.title,
        description: receivedGroupData.description,
        category: receivedGroupData.cat,
        image: receivedGroupData.img,
        adminList: receivedGroupData.admin,
        eventList: [],
        members: receivedGroupData.admin,
      };
      groups.push(newGroup);
      this.saveEventGroup(groups);
      return true;
    } catch (error) {
      return false;
    }
  }

  editGroupInfoByGroupId(groupId: number, data: any): boolean {
    let groupInfo = this.fetchEventGroupById(groupId);
    try {
      groupInfo[0].title = data.title;
      groupInfo[0].description = data.description;
      groupInfo[0].category = data.cat;
      groupInfo[0].image = data.img;

      this.saveEventGroup(this.eventGroups);
    } catch (error) {
      return false;
    }
    return true;
  }

  fetchEventGroupById(groupId: number): EventGroup[] {
    let data = this.getEventGroups();
    return data.filter((x) => x.id == groupId);
  }

  addAdministratorToEventGroup(groupID: number, userEmail: string): string {
    let users = this.getAllUsers();
    let user = users.filter((x) => x.email == userEmail);
    if (!user?.length) {
      return 'error';
    }

    let groupsList = this.getEventGroups();
    let group = groupsList.filter((x) => x.id == groupID);

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

  fetchAllMembersByGroupId(groupId: number): any {
    let groupInfo = this.fetchEventGroupById(groupId);
    return groupInfo[0].members;
  }

  deleteMember(groupId: number, memberId: number): boolean {
    let groupInfo = this.fetchEventGroupById(groupId);

    try {
      let member = groupInfo[0].members;
      groupInfo[0].members = member.filter((x) => x.id !== memberId);
      this.saveEventGroup(this.eventGroups);
      return true;
    } catch (error) {
      return false;
    }
  }

  fetchAllAdminsByGroupId(groupId: number): any {
    let groupInfo = this.fetchEventGroupById(groupId);
    return groupInfo[0].adminList;
  }

  deleteAdministrator(groupId: number, id: number): boolean {
    let groupInfo = this.fetchEventGroupById(groupId);

    try {
      let admins = groupInfo[0].adminList;
      if (admins.length === 1) {
        return false;
      }
      groupInfo[0].adminList = admins.filter((x) => x.id !== id);
      this.saveEventGroup(this.eventGroups);
      return true;
    } catch (error) {
      return false;
    }
  }

  addNewEventToAGRoup(groupId: number, newEventInfo: any): boolean {
    try {
      let group = this.fetchEventGroupById(groupId);
      let oldEventList = group[0].eventList;

      group[0].eventList = [...oldEventList, ...newEventInfo];
      this.saveEventGroup(this.eventGroups);

      return true;
    } catch (error) {
      return false;
    }
  }

  deleteGroup(grpId: number): boolean {
    try {
      let groups = this.getEventGroups();
      let newGroups = groups.filter((x) => x.id !== grpId);
      this.saveEventGroup(newGroups);
      return true;
    } catch (error) {
      return false;
    }
  }
}
