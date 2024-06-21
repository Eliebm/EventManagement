import { Component } from '@angular/core';
import { User } from '../../Models/user.Models';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EventServicesService } from '../../Service/event-services.service';
import { AccountService } from '../../Service/account.service';

@Component({
  selector: 'app-edit-event-info',
  templateUrl: './edit-event-info.component.html',
  styleUrl: './edit-event-info.component.scss',
})
export class EditEventInfoComponent {
  themeStorageKey: string = 'DarkMode';
  userInfo: User[] = [];
  retrievedMode: any;
  showToastMessage: boolean = false;
  toastMessage!: string;
  toastType!: string;
  loadingInProgress: boolean = false;
  eventInfo: any;
  eventId: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventServicesService,
    private accountService: AccountService
  ) {
    this.eventId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.SelectedTheme();
    this.fetchLoginUserInfo();
    this.fetchEventInfo();
  }

  fetchLoginUserInfo(): void {
    this.userInfo = this.accountService.fetchSignedInUserInfo();
    if (!this.userInfo.length) {
      this.router.navigate(['/Events']);
    }
  }

  fetchEventInfo(): void {
    this.eventInfo = this.eventService.fetchEventInfoById(this.eventId);
  }

  SelectedTheme() {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
  }
  returnBack(): void {
    this.router.navigate(['/Events/' + this.eventId]);
  }

  displayToastMessage(type: string, msg: string): void {
    this.showToastMessage = true;
    this.toastType = type;
    this.toastMessage = msg;
  }

  closeToastMessage(): void {
    setTimeout(() => {
      this.showToastMessage = false;
    }, 3000);
  }

  checkFormValidation(data: any): void {
    let currentDate = new Date();
    if (
      data.title == '' ||
      data.description == '' ||
      data.eventType == 'undefined' ||
      data.location == 'undefined' ||
      data.img == 'undefined' ||
      data.presentation == 'undefined'
    ) {
      this.displayToastMessage(
        'alert-error',
        'One or more fields are empty. Please check your inputs.'
      );
      this.closeToastMessage();
    } else if (data.startTime == 'undefined') {
      this.displayToastMessage(
        'alert-warning',
        'Please confirm your time selection with a checkbox'
      );
      this.closeToastMessage();
    } else if (data.startDate.getDate() === currentDate.getDate()) {
      this.displayToastMessage(
        'alert-warning',
        "Selected date must differ from today's date"
      );
      this.closeToastMessage();
    } else {
      this.submitForm(data);
    }
  }

  submitForm(data: any): void {
    this.loadingInProgress = true;
    let response = this.eventService.editEventInfoById(this.eventId, data);
    if (response == true) {
      this.displayToastMessage(
        'alert-success',
        'The event has been successfully edited.'
      );

      setTimeout(() => {
        this.loadingInProgress = false;
      }, 3000);
    } else {
      this.displayToastMessage('alert-error', 'Unable to edit the event');
    }
    this.closeToastMessage();
  }
}
