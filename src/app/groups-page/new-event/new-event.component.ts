import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../Service/account.service';
import { EventGroupsService } from '../../Service/event-groups.service';
import { User } from '../../Models/user.Models';
import { EventServicesService } from '../../Service/event-services.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrl: './new-event.component.scss',
})
export class NewEventComponent {
  themeStorageKey: string = 'DarkMode';
  userInfo: User[] = [];
  retrievedMode: any;
  showToastMessage: boolean = false;
  toastMessage!: string;
  toastType!: string;
  loadingInProgress: boolean = false;
  groupId: any;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private groupService: EventGroupsService,
    private accountService: AccountService,
    private eventService: EventServicesService
  ) {}

  ngOnInit(): void {
    this.groupId = this._route.snapshot.paramMap.get('id');
    console.log(this.groupId);
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
    this.router.navigate(['/Groups/' + this.groupId]);
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
      let eventInfo = this.eventService.fetchEventInfoById(response.id);
      if (this.groupService.addNewEventToAGRoup(this.groupId, eventInfo)) {
        this.displayToastMessage(
          'alert-success',
          'The event has been successfully created and Added '
        );
      }

      setTimeout(() => {
        this.loadingInProgress = false;
      }, 3000);
    } else {
      this.displayToastMessage('alert-error', 'Unable to create the event');
    }
    this.closeToastMessage();
  }
}
