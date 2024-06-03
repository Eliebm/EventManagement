import { Component, Input, OnInit } from '@angular/core';
import { EventClass } from '../Models/event.Models';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  @Input() fetchedEvents!: EventClass[];
  showedEvents!: EventClass[];

  ngOnInit(): void {
    this.showedEvents = this.shuffleArray(this.fetchedEvents);
  }

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
