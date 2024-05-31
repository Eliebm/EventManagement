import { BaseClass } from './baseClass.Models';

export class Rating extends BaseClass {
  userId: number;
  rates: number;

  constructor(id: number, userId: number, rates: number) {
    super(id);
    this.userId = userId;
    this.rates = rates;
  }
}
