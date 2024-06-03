import { EventBaseClass } from './baseClass.Models';
import { EventClass } from './event.Models';
import { User } from './user.Models';

export class EventGroup extends EventBaseClass {
  category: string;
  image: string;
  adminList: User[];
  eventList: EventClass[];

  constructor(
    id: number,
    title: string,
    description: string,
    category: string,
    image: string,
    adminList: User[],
    eventList: EventClass[]
  ) {
    super(id, title, description);

    this.category = category;
    this.image = image;
    this.adminList = adminList;
    this.eventList = eventList;
  }
}
