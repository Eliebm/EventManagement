import { Time } from '@angular/common';
import { BaseClass } from './baseClass.Models';

export class Agenda extends BaseClass {
  summary: string;
  startTime: Time;
  endTime: Time;

  constructor(id: number, summary: string, startTime: Time, endTime: Time) {
    super(id);
    this.summary = summary;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
