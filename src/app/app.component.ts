import { Component, OnInit } from '@angular/core';
import { User, deleteUser } from './Models/user.Models';
import { BaseClass, generateAutoIncrementId } from './Models/baseClass.Models';
import { EventClass } from './Models/event.Models';

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
      addUser: function (pushUser: any): void {
        this.userList.push(pushUser);
      },
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
      addUser: function (pushUser: any): void {
        this.userList.push(pushUser);
      },
      agendaList: [],
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  generateUser(): void {
    let newId = generateAutoIncrementId(this.user);
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
    let fetchedEvent = this.event.filter((x) => x.id === 1);
    let fetchedUser = this.user.filter((x) => x.id === 3);

    if (fetchedUser.length === 0) {
      alert('User Does not exisit !');
    } else {
      fetchedEvent[0].addUser(fetchedUser);
      console.log(this.event);
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
