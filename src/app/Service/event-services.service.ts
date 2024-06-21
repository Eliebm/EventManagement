import { Injectable } from '@angular/core';
import { EventClass } from '../Models/event.Models';
import { staticEvent } from '../Models/staticData.Models';

import { AccountService } from './account.service';
import { EventGroupsService } from './event-groups.service';
import { BaseService } from './baseService/base.service';
import { Rating } from '../Models/rating.Models';

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

  isUserAdministrator(eventID: number, userId: number): boolean {
    let eventsList = this.getAllEvents();
    let event = eventsList.filter((x) => x.id == eventID);
    let admin = event[0].hostList;

    if (admin.filter((x) => x.id === userId)?.length) {
      return true;
    } else {
      return false;
    }
  }

  addAdministratorToEventGroup(eventID: number, userEmail: string): string {
    let users = this._accountService.fetchUsers();
    let user = users.filter((x) => x.email == userEmail);
    let gId = this.checkIfEventBelongsToGroup(eventID);
    if (!user?.length) {
      return 'error';
    }

    let eventList = this.getAllEvents();
    let event = eventList.filter((x) => x.id == eventID);

    let oldHostList = event[0].hostList;

    if (oldHostList.filter((x) => x.email == userEmail)?.length) {
      return 'false';
    } else {
      event[0].hostList = [...oldHostList, ...user];

      this.saveEventInfo(this.events);
      this.updateEventInfoInGroup(gId, eventID);
      return 'true';
    }
  }

  checkIfUserIsAMember(eventId: number, userId: number): boolean {
    let eventInfo = this.events.filter((x) => x.id == eventId);
    let isJoin = eventInfo[0].userList.filter((x) => x.id === userId);

    if (isJoin.length) {
      return true;
    }
    return false;
  }

  addUserToEvent(groupId: number, eventId: number, userId: number): String {
    let usId = userId;
    this.user = this._accountService.fetchUsers();
    let fetchedEvent = this.getAllEvents().filter((x) => x.id == eventId);
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
    this.updateEventInfoInGroup(groupId, eventId);
  }

  deleteMember(eveId: number, memberId: number): boolean {
    let eventInfo = this.fetchEventInfoById(eveId);
    let groupId = this.checkIfEventBelongsToGroup(eveId);

    try {
      let member = eventInfo[0].userList;
      eventInfo[0].userList = member.filter((x) => x.id !== memberId);
      this.saveEventInfo(this.events);
      this.updateEventInfoInGroup(groupId, eveId);
      return true;
    } catch (error) {
      return false;
    }
  }

  checkIfEventBelongsToGroup(eventID: number): number {
    let groupId = 0;
    let groups = this.eventGroupService.getEventGroups();

    let group = groups.forEach((items) => {
      if (items.eventList.find((x) => x.id == eventID)) {
        groupId = items.id;
      }
    });

    return groupId;
  }

  addRatingToEvent(
    eventId: number,
    receivedUserId: number,
    rate: number
  ): boolean {
    let gId = this.checkIfEventBelongsToGroup(eventId);
    let event = this.fetchEventInfoById(eventId);
    let rateList = event[0].rating;
    let newId = this.baseService.generateAutoIncrementId(rateList);
    let checkUserRate = rateList.filter((x) => x.userId === receivedUserId);

    try {
      if (checkUserRate.length) {
        checkUserRate[0].rates = rate;
      } else {
        let rating: Rating;
        rating = { id: newId, userId: receivedUserId, rates: rate };
        event[0].rating.push(rating);
      }
      let count = 0;
      event[0].rating.map((x) => {
        count += x.rates;
      });
      event[0].totalRating = count / event[0].rating.length;
      this.saveEventInfo(this.events);

      // update event with rating to groupEvent if this event belongs to a group
      this.updateEventInfoInGroup(gId, eventId);
      return true;
    } catch (error) {
      return false;
    }
  }

  updateEventInfoInGroup(gId: number, eventId: number): void {
    //update group eventList with new user in the event
    // refetch the event after saved it with the new user to add it to the event group
    let fetchedNewEvent = this.getAllEvents().filter((x) => x.id == eventId);
    if (gId != 0) {
      this.eventGroupService.updateEventsOfEventGroup(gId, fetchedNewEvent);
    }
  }

  deleteEvent(eveId: number): boolean {
    try {
      let events = this.getAllEvents();
      let gid = this.checkIfEventBelongsToGroup(eveId);
      this.events = events.filter((x) => x.id != eveId);
      this.saveEventInfo(this.events);

      if (gid != 0) {
        let groups = this.eventGroupService.getEventGroups();
        let group = groups.filter((x) => x.id == gid);
        let oldEventList = group[0].eventList;
        group[0].eventList = oldEventList.filter((x) => x.id != eveId);
        this.eventGroupService.saveEventGroup(groups);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  editEventInfoById(eveID: number, data: any): boolean {
    let events = this.getAllEvents();
    let eventInfo = this.events.filter((x) => x.id == eveID);
    try {
      eventInfo[0].title = data.title;
      eventInfo[0].description = data.description;

      eventInfo[0].type = data.eventType;
      eventInfo[0].startDate = data.startDate;
      eventInfo[0].startTime = data.startTime;
      eventInfo[0].image = data.img;
      eventInfo[0].location = data.location;
      eventInfo[0].presentationType = data.presentation;
      this.saveEventInfo(events);

      let gid = this.checkIfEventBelongsToGroup(eveID);
      this.updateEventInfoInGroup(gid, eveID);

      return true;
    } catch (error) {
      return false;
    }
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
