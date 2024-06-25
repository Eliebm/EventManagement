import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventGroupsService } from '../../Service/event-groups.service';
import { AccountService } from '../../Service/account.service';
import { User } from '../../Models/user.Models';

@Component({
  selector: 'app-create-new-group',
  templateUrl: './create-new-group.component.html',
  styleUrl: './create-new-group.component.scss',
})
export class CreateNewGroupComponent implements OnInit {
  themeStorageKey: string = 'DarkMode';
  userInfo: User[] = [];
  retrievedMode: any;
  showToastMessage: boolean = false;
  toastMessage!: string;
  toastType!: string;
  loadingInProgress: boolean = false;

  constructor(
    private router: Router,
    private groupService: EventGroupsService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.SelectedTheme();
    this.fetchLoginUserInfo();
  }

  fetchLoginUserInfo(): void {
    this.userInfo = this.accountService.fetchSignedInUserInfo();
    if (!this.userInfo.length) {
      this.router.navigate(['/Groups']);
    }
  }

  SelectedTheme() {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
  }
  returnBack(): void {
    let ActiveRoute = localStorage.getItem('A.R');
    this.router.navigate([ActiveRoute]);
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
    if (
      data.title == '' ||
      data.description == '' ||
      data.cat == 'undefined' ||
      data.img == 'undefined'
    ) {
      this.displayToastMessage(
        'alert-error',
        'One or more fields are empty. Please check your inputs.'
      );
      this.closeToastMessage();
    } else {
      data.admin = this.userInfo;
      this.submitForm(data);
    }
  }

  submitForm(data: any): void {
    this.loadingInProgress = true;
    let response = this.groupService.addNewGroup(data);
    if (response == true) {
      this.displayToastMessage(
        'alert-success',
        'The group has been successfully created.'
      );
      setTimeout(() => {
        this.loadingInProgress = false;
      }, 3000);
    } else {
      this.displayToastMessage('alert-error', 'Unable to create the group');
    }

    this.closeToastMessage();
  }
}
