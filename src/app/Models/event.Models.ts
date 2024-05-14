import { Agenda } from './agenda.Models';
import { EventBaseClass } from './baseClass.Models';
import { User } from './user.Models';

export class EventClass extends EventBaseClass {
  startDate: Date;
  endDate: Date;
  location: string;
  userList: Array<User>;
  agendaList: Agenda[];

  constructor(
    id: number,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    location: string,
    userList: Array<User>,
    agendaList: Agenda[]
  ) {
    super(id, title, description);
    this.startDate = startDate;
    this.endDate = endDate;
    this.location = location;
    this.userList = userList;
    this.agendaList = agendaList;
  }

  addUser(pushUser: any) {}
}
