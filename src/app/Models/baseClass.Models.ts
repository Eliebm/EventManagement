export abstract class BaseClass {
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export abstract class EventBaseClass {
  id: number;
  title: string;
  description: string;

  constructor(id: number, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}
