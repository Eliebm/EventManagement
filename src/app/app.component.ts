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
      title: 'dasd',
      description: 'asdasd',
      startDate: new Date(),
      endDate: new Date(),
      location: '',
      userList: [],
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
}
