import { BaseClass } from "./baseClass.Models";

export class Rating extends BaseClass{
    rates:number;

    constructor(id:number,rates:number){
        super(id),
        this.rates=rates,
    }
}