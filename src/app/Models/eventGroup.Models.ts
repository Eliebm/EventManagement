import { EventBaseClass } from './baseClass.Models';
import { EventClass } from './event.Models';
import { User } from './user.Models';

export class EventGroup extends EventBaseClass {
  category: string;
  adminList: User[];
  eventList: EventClass[];

  constructor(
    id: number,
    title: string,
    description: string,
    category: string,
    adminList: User[],
    eventList: EventClass[]
  ) {
    super(id, title, description);

    this.category = category;
    this.adminList = adminList;
    this.eventList = eventList;
  }
}
