import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user.Models';
import { Router } from '@angular/router';

import { AccountService } from '../../Service/account.service';
import { EventServicesService } from '../../Service/event-services.service';

@Component({
  selector: 'app-create-new-event',
  templateUrl: './create-new-event.component.html',
  styleUrl: './create-new-event.component.scss',
})
export class CreateNewEventComponent implements OnInit {
  themeStorageKey: string = 'DarkMode';
  userInfo: User[] = [];
  retrievedMode: any;
  showToastMessage: boolean = false;
  toastMessage!: string;
  toastType!: string;
  loadingInProgress: boolean = false;

  constructor(
    private router: Router,
    private eventService: EventServicesService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.SelectedTheme();
    this.fetchLoginUserInfo();
  }

  fetchLoginUserInfo(): void {
    this.userInfo = this.accountService.fetchSignedInUserInfo();
    if (!this.userInfo.length) {
      this.router.navigate(['/Events']);
    }
  }

  SelectedTheme() {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
  }

  returnBack(): void {
    let activeRoute = localStorage.getItem('A.R');
    this.router.navigate([activeRoute]);
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
      data.admin = this.userInfo;
      (data.adminName =
        this.userInfo[0].firstName + ' ' + this.userInfo[0].lastName),
        this.submitForm(data);
    }
  }

  submitForm(data: any): void {
    this.loadingInProgress = true;
    let response = this.eventService.addNewEvent(data);
    if (response.flag == true) {
      this.displayToastMessage(
        'alert-success',
        'The event has been successfully created.'
      );

      setTimeout(() => {
        this.loadingInProgress = false;
      }, 3000);
    } else {
      this.displayToastMessage('alert-error', 'Unable to create the event');
    }
    this.closeToastMessage();
  }
}
