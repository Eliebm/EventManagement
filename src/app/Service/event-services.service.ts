import { Injectable } from '@angular/core';
import { EventClass } from '../Models/event.Models';

@Injectable({
  providedIn: 'root',
})
export class EventServicesService {
  event: EventClass[] = [
    {
      id: 1,
      title: 'event 1',
      description: 'asdasd',
      type: '',
      startDate: new Date(),
      endDate: new Date(),
      location: '',
      userList: [
        {
          id: 1,
          firstName: 'elie',
          lastName: '',
          email: '',
          password: '',
          location: '',
        },
        {
          id: 2,
          firstName: 'pierre',
          lastName: '',
          email: '',
          password: '',
          location: '',
        },
      ],
      agendaList: [],
    },
    {
      id: 2,
      title: 'event 2',
      description: 'asdasd',
      type: '',
      startDate: new Date(),
      endDate: new Date(),
      location: '',
      userList: [
        {
          id: 3,
          firstName: 'elie',
          lastName: '',
          email: '',
          password: '',
          location: '',
        },
        {
          id: 2,
          firstName: 'elie',
          lastName: '',
          email: '',
          password: '',
          location: '',
        },
      ],

      agendaList: [],
    },
  ];

  user: any[] = [];

  constructor() {}

  addUserToEvent(): void {
    let xid = 3;
    let fetchedEvent = this.event.filter((x) => x.id === 1);
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
    this.event.forEach((item) => {
      if (item.userList.find((u2) => u2.id === id)) {
        fetchedList.push(item);
      }
    });

    console.log(fetchedList);
  }
}
