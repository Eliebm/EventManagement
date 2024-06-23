import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-timeline-modal',
  templateUrl: './timeline-modal.component.html',
  styleUrl: './timeline-modal.component.scss',
})
export class TimelineModalComponent implements OnInit {
  themeVal: any;
  titleInput!: string;
  timeSelector!: any;
  currentDate: Date = new Date();
  isError: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; time: Date },
    private dialogRef: MatDialogRef<TimelineModalComponent>
  ) {}

  ngOnInit() {
    this.themeVal = localStorage.getItem('DarkMode');
    this.currentDate.setHours(0);
    this.currentDate.setMinutes(0);
  }

  closeModal(): void {
    this.dialogRef.close({ data: null });
  }

  passSelectedTime(time: any): void {
    this.timeSelector = time;
  }
  confirm(): void {
    if (this.timeSelector === undefined || this.titleInput === undefined) {
      this.isError = true;
    } else {
      this.dialogRef.close({
        data: { title: this.titleInput, time: this.timeSelector },
      });
    }
  }
}
