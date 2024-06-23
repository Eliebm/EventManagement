import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Agenda } from '../../../Models/agenda.Models';

@Component({
  selector: 'app-event-time-line',
  templateUrl: './event-time-line.component.html',
  styleUrl: './event-time-line.component.scss',
})
export class EventTimeLineComponent implements OnInit, OnChanges {
  @Input() isAdmin!: boolean;
  @Input() agenda!: Agenda[];
  @Output() openTimeLineModal = new EventEmitter<any>();
  @Output() deleteTimeLine = new EventEmitter<number>();

  showAgendaItem: any;
  ngOnInit() {
    this.fetchData();
  }

  ngOnChanges(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.agenda.map((x) => (x.startTime = new Date(x.startTime)));

    this.showAgendaItem = this.agenda.sort(
      (a, b) => a.startTime.getTime() - b.startTime.getTime()
    );
  }

  addTimeline(): void {
    this.openTimeLineModal.emit();
  }

  delete(itemId: number): void {
    this.deleteTimeLine.emit(itemId);
  }
}
