import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { EventClass } from '../../../Models/event.Models';

@Component({
  selector: 'app-group-event-list',
  templateUrl: './group-event-list.component.html',
  styleUrl: './group-event-list.component.scss',
})
export class GroupEventListComponent implements OnInit, OnChanges {
  @Input() allEvents?: EventClass[];
  @Input() isAdministrator: boolean = false;
  @Input() isUserSignedIn: boolean = false;
  @Output() AttendEvent = new EventEmitter<number>();
  @Output() addNewEventButton = new EventEmitter<any>();

  showEvents?: EventClass[];

  ngOnInit(): void {
    this.fetchList();
  }
  ngOnChanges(): void {
    this.fetchList();
  }
  applyToAttend(eventId: number): void {
    this.AttendEvent.emit(eventId);
  }
  fetchList(): void {
    this.showEvents = this.allEvents;
  }
  addNewEvent(): void {
    this.addNewEventButton.emit();
  }
}
