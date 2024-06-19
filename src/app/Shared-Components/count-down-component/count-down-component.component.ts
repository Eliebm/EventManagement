import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-count-down-component',
  templateUrl: './count-down-component.component.html',
  styleUrl: './count-down-component.component.scss',
})
export class CountDownComponentComponent implements OnInit, OnDestroy {
  @Input() eventDate: any;
  @Input() eventTime: any;
  private subscription!: Subscription;

  countdownDay: any;
  countdownHour: any;
  countdownMinute: any;
  countdownSecond: any;

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe(() => this.updateCountdown());
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateCountdown(): void {
    const countdownDate: any = new Date(this.eventDate);
    let time = new Date(this.eventTime);

    countdownDate.setHours(time.getHours());
    countdownDate.setMinutes(time.getMinutes());
    countdownDate.setSeconds(time.getSeconds());

    const now: any = new Date();

    const timeRemaining = countdownDate - now;

    if (timeRemaining < 0) {
      this.countdownDay = '0';
      this.countdownHour = '0';
      this.countdownMinute = '0';
      this.countdownSecond = '0';
    } else {
      this.countdownDay = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

      this.countdownHour = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      this.countdownMinute = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );

      this.countdownSecond = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    }
  }
}
