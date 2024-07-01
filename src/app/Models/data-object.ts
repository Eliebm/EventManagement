import { BaseClass } from './baseClass.Models';

export class DataObject extends BaseClass {
  name!: string;
  data!: any;

  constructor(id: number, name: string, data: any) {
    super(id);
    this.name = name;
    this.data = data;
  }
}
