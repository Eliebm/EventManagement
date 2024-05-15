import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor() {}

  generateAutoIncrementId(obj: any): number {
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
}
