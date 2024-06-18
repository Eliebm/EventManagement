import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss',
})
export class TimePickerComponent implements OnInit {
  @Output() emitTimeSelected = new EventEmitter<any>();
  Time = new Date();
  selectedTime: any;

  hours: number[] = Array.from({ length: 24 }, (_, i) => i); // Generate hours 0-23
  minutes: number[] = Array.from({ length: 60 }, (_, i) => i); // Generate minutes 0-59

  selectedHour: number = 0;
  selectedMinute: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.emitTimeSelected.emit('undefined');
  }

  emitTime() {
    this.Time.setHours(this.selectedHour);
    this.Time.setMinutes(this.selectedMinute);
    this.selectedTime = this.Time;
    this.emitTimeSelected.emit(this.selectedTime);
  }
}
