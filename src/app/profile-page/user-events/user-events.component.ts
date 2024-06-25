import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventClass } from '../../Models/event.Models';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrl: './user-events.component.scss',
})
export class UserEventsComponent implements OnInit {
  @Input() allEvents: EventClass[] = [];
  @Output() searchEvents = new EventEmitter<any>();

  showedEvent!: EventClass[];

  ngOnInit(): void {
    this.displayData();
  }
  ngOnChanges(): void {
    this.displayData();
  }

  displayData(): void {
    this.showedEvent = this.allEvents;
  }
  submitSearch(data: any): void {
    this.searchEvents.emit(data);
  }
}
