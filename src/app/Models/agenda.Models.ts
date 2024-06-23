import { Time } from '@angular/common';
import { BaseClass } from './baseClass.Models';

export class Agenda extends BaseClass {
  summary: string;
  startTime: Date;

  constructor(id: number, summary: string, startTime: Date) {
    super(id);
    this.summary = summary;
    this.startTime = startTime;
  }
}
