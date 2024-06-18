import { Injectable } from '@angular/core';
import { EventClass } from '../Models/event.Models';
import { staticEvent } from '../Models/staticData.Models';

import { AccountService } from './account.service';
import { EventGroupsService } from './event-groups.service';
import { BaseService } from './baseService/base.service';

@Injectable({
  providedIn: 'root',
})
export class EventServicesService {
  private storageKey!: string;
  events!: Array<EventClass>;
  staticEventData: EventClass[] = staticEvent;

  user: any[] = [];

  constructor(
    private _accountService: AccountService,
    private eventGroupService: EventGroupsService,
    private baseService: BaseService
  ) {}

  setStaticData(): void {
    this.storageKey = 'All-Events';
    if (!localStorage.getItem(this.storageKey)?.length) {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.staticEventData)
      );
    }
  }

  saveEventInfo(eventInfo: any): void {
    this.storageKey = 'All-Events';
    localStorage.setItem(this.storageKey, JSON.stringify(eventInfo));
  }

  getAllEvents(): EventClass[] {
    this.storageKey = 'All-Events';
    let data = localStorage.getItem(this.storageKey);
    if (data) {
      this.events = JSON.parse(data);
    }
    return this.events;
  }

  fetchEventInfoById(eventId: number): EventClass[] {
    let data = this.getAllEvents();
    return data.filter((x) => x.id == eventId);
  }

  addNewEvent(eventData: any): any {
    type returnObject = {
      id: number;

      flag: boolean;
    };
    let confirmationFlag: returnObject;

    let events = this.getAllEvents();
    let newId = this.baseService.generateAutoIncrementId(events);
    let newEvent: EventClass;
    try {
      newEvent = {
        id: newId,
        title: eventData.title,
        description: eventData.description,
        admin: eventData.adminName,
        type: eventData.eventType,
        startDate: eventData.startDate,
        startTime: eventData.startTime,
        image: eventData.img,
        location: eventData.location,
        presentationType: eventData.presentation,
        userList: eventData.admin,
        hostList: eventData.admin,
        agendaList: [],
        rating: [],
        totalRating: 0,
      };
      events.push(newEvent);
      this.saveEventInfo(events);
      confirmationFlag = { id: newId, flag: true };
    } catch (error) {
      confirmationFlag = { id: 0, flag: false };
    }
    return confirmationFlag;
  }

  addUserToEvent(groupId: number, eventId: number, userId: number): String {
    let usId = userId;
    this.user = this._accountService.fetchUsers();
    let fetchedEvent = this.getAllEvents().filter((x) => x.id === eventId);
    let fetchedUser = this.user.filter((x) => x.id === usId);

    let isUserJoined = fetchedEvent[0].userList;
    let msg = '';
    if (fetchedUser.length === 0) {
      msg = 'error_1';
    } else if (isUserJoined.filter((x) => x.id == usId).length !== 0) {
      msg = 'error_2';
    } else {
      this.addUser(groupId, fetchedUser, eventId, fetchedEvent);

      msg = 'success';
    }
    return msg;
  }

  private addUser(
    groupId: number,
    pushUser: any,
    eventId: any,
    event: EventClass[]
  ): void {
    //add user to userList in event data
    let oldUserList = event[0].userList;
    event[0].userList = [...oldUserList, ...pushUser];
    this.saveEventInfo(this.events);

    //update group eventList with new user in the event
    // refetch the event after saved it with the new user to add it to the event group
    let fetchedNewEvent = this.getAllEvents().filter((x) => x.id === eventId);
    this.eventGroupService.updateEventsOfEventGroup(groupId, fetchedNewEvent);
  }

  fetchEventByUserId(): void {
    let id = 3;
    console.log('user id :' + id);
    let fetchedList: any = [];
    this.staticEventData.forEach((item) => {
      if (item.userList.find((u2) => u2.id === id)) {
        fetchedList.push(item);
      }
    });

    console.log(fetchedList);
  }
}
