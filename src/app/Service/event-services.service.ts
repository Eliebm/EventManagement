import { Injectable } from '@angular/core';
import { EventClass } from '../Models/event.Models';
import { staticEvent } from '../Models/staticData.Models';

@Injectable({
  providedIn: 'root',
})
export class EventServicesService {
  private storageKey!: string;
  staticEventData: EventClass[] = staticEvent;

  user: any[] = [];

  constructor() {}
  setStaticData(): void {
    this.storageKey = 'All-Events';
    if (!localStorage.getItem(this.storageKey)?.length) {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.staticEventData)
      );
    }
  }
  addUserToEvent(): void {
    let xid = 3;
    let fetchedEvent = this.staticEventData.filter((x) => x.id === 1);
    let fetchedUser = this.user.filter((x) => x.id === xid);
    let isUserJoined = fetchedEvent[0].userList;

    if (fetchedUser.length === 0) {
      alert('User Does not exisit !');
    } else if (isUserJoined.filter((x) => x.id === xid).length !== 0) {
      console.log('user already joined this event');
    } else {
      this.addUser(fetchedUser, fetchedEvent);
      console.log(fetchedEvent);
    }
  }

  addUser(pushUser: any, event: EventClass[]): void {
    let oldlist = event[0].userList;
    let eventinf = event;
    event[0].userList = [...oldlist, ...pushUser];
    // eventinf[0].userList.push.apply(oldlist, pushUser);
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
