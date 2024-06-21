import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss',
})
export class TimePickerComponent implements OnInit, OnChanges {
  @Input() timeData!: Date;
  @Output() emitTimeSelected = new EventEmitter<any>();
  selectedTime: any;

  hours: number[] = Array.from({ length: 24 }, (_, i) => i); // Generate hours 0-23
  minutes: number[] = Array.from({ length: 60 }, (_, i) => i); // Generate minutes 0-59

  selectedHour: number = 0;
  selectedMinute: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.setTimeData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setTimeData();
  }

  setTimeData(): void {
    if (this.timeData) {
      let time: Date = new Date(this.timeData);
      this.selectedTime = time;
      this.selectedHour = time.getHours();
      this.selectedMinute = time.getMinutes();
    } else {
      this.emitTimeSelected.emit('undefined');
    }
  }

  emitTime(): void {
    this.selectedTime = new Date();
    this.selectedTime.setHours(this.selectedHour);
    this.selectedTime.setMinutes(this.selectedMinute);

    this.emitTimeSelected.emit(this.selectedTime);
  }
}
