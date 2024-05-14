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

export function generateAutoIncrementId(obj: any): number {
  let newId;
  if (obj.length == 0) {
    return (newId = 1);
  } else {
    let array2 = obj.sort((a: any, b: any) => a.id - b.id);
    array2 = array2.reverse();
    let oldId = array2[0].id;

    newId = oldId + 1;

    return newId;
  }
}
