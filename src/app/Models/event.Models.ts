import { Agenda } from './agenda.Models';
import { EventBaseClass } from './baseClass.Models';
import { User } from './user.Models';

export class EventClass extends EventBaseClass {
  type: string;
  startDate: Date;
  endDate: Date;
  location: string;
  userList: Array<User>;
  agendaList: Agenda[];

  constructor(
    id: number,
    title: string,
    description: string,
    type: string,
    startDate: Date,
    endDate: Date,
    location: string,
    userList: Array<User>,
    agendaList: Agenda[]
  ) {
    super(id, title, description);
    this.type = type;
    this.startDate = startDate;
    this.endDate = endDate;
    this.location = location;
    this.userList = userList;
    this.agendaList = agendaList;
  }
}
