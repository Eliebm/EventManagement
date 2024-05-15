import { Component, OnInit } from '@angular/core';
import { User, deleteUser } from './Models/user.Models';
import { BaseClass } from './Models/baseClass.Models';
import { EventClass, addUser } from './Models/event.Models';
import { BaseService } from './Service/baseService/base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  user: User[] = [
    { id: 1, firstName: 'elie', lastName: 'dadas', email: '', password: '' },
  ];

  event: EventClass[] = [
    {
      id: 1,
      title: 'event 1',
      description: 'asdasd',
      startDate: new Date(),
      endDate: new Date(),
      location: '',
      userList: [
        { id: 1, firstName: 'elie', lastName: '', email: '', password: '' },
        { id: 2, firstName: 'pierre', lastName: '', email: '', password: '' },
      ],
      agendaList: [],
    },
    {
      id: 2,
      title: 'event 2',
      description: 'asdasd',
      startDate: new Date(),
      endDate: new Date(),
      location: '',
      userList: [
        { id: 3, firstName: 'elie', lastName: '', email: '', password: '' },
        { id: 2, firstName: 'elie', lastName: '', email: '', password: '' },
      ],

      agendaList: [],
    },
  ];

  constructor(private baseService: BaseService) {}

  ngOnInit(): void {}

  generateUser(): void {
    let newId = this.baseService.generateAutoIncrementId(this.user);
    console.log(newId);
    this.user.push({
      id: newId,
      firstName: 'elie',
      lastName: 'dadas',
      email: '',
      password: '',
    });
    console.log(this.user);
  }

  deleteUser(): void {
    this.user = deleteUser(3, this.user);
    console.log(this.user);
  }

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
      addUser(fetchedUser, fetchedEvent);
      console.log(fetchedEvent);
    }
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
