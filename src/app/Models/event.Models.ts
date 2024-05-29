import { Agenda } from './agenda.Models';
import { EventBaseClass } from './baseClass.Models';
import { Rating } from './rating.Models';
import { User } from './user.Models';

export class EventClass extends EventBaseClass {
  type: string;
  startDate: Date;
  endDate: Date;
  location: string;
  presentationType: string;
  userList: Array<User>;
  agendaList: Agenda[];
  rating: Rating[];
  totalRating: number;

  constructor(
    id: number,
    title: string,
    description: string,
    type: string,
    startDate: Date,
    endDate: Date,
    location: string,
    presentationType: string,
    userList: Array<User>,
    agendaList: Agenda[],
    rating: Rating[],
    totalRating: number
  ) {
    super(id, title, description);
    this.type = type;
    this.startDate = startDate;
    this.endDate = endDate;
    this.location = location;
    this.presentationType = presentationType;
    this.userList = userList;
    this.agendaList = agendaList;
    this.rating = rating;
    this.totalRating = totalRating;
  }
}
