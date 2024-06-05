import { Component, Input, OnInit } from '@angular/core';
import { EventClass } from '../../Models/event.Models';
import { BaseService } from '../../Service/baseService/base.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  @Input() fetchedEvents!: EventClass[];
  showedEvents!: EventClass[];
  constructor(private baseService: BaseService) {}

  ngOnInit(): void {
    this.displayGroupsByRoute();
  }

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  displayGroupsByRoute(): void {
    let active_route;
    active_route = this.baseService.getRecentActiveRoute();

    if (active_route.includes('Home')) {
      this.showedEvents = this.shuffleArray(this.fetchedEvents).slice(0, 8);
    } else {
      this.showedEvents = this.shuffleArray(this.fetchedEvents);
    }
  }
}
