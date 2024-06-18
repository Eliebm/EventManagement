import { Agenda } from './agenda.Models';
import { EventBaseClass } from './baseClass.Models';
import { Rating } from './rating.Models';
import { User } from './user.Models';

export class EventClass extends EventBaseClass {
  admin: string;
  type: string;
  startDate: Date;
  startTime: Date;
  image: string;
  location: string;
  presentationType: string;
  userList: Array<User>;
  hostList: User[];
  agendaList: Agenda[];
  rating: Rating[];
  totalRating: number;

  constructor(
    id: number,
    title: string,
    description: string,
    admin: string,
    type: string,
    startDate: Date,
    startTime: Date,
    image: string,
    location: string,
    presentationType: string,
    userList: Array<User>,
    hostList: User[],
    agendaList: Agenda[],
    rating: Rating[],
    totalRating: number
  ) {
    super(id, title, description);
    this.admin = admin;
    this.type = type;
    this.startDate = startDate;
    this.startTime = startTime;
    this.image = image;
    this.location = location;
    this.presentationType = presentationType;
    this.userList = userList;
    this.hostList = hostList;
    this.agendaList = agendaList;
    this.rating = rating;
    this.totalRating = totalRating;
  }
}
