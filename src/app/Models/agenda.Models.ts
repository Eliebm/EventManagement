import { BaseClass } from './baseClass.Models';

export class Agenda extends BaseClass {
  summary: string;
  startTime: Date;
  endTime: Date;

  constructor(id: number, summary: string, startTime: Date, endTime: Date) {
    super(id);
    this.summary = summary;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
