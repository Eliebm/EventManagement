import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../Service/baseService/base.service';
import { EventGroupsService } from '../Service/event-groups.service';
import { AccountService } from '../Service/account.service';
import { User } from '../Models/user.Models';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  themeStorageKey: string = 'DarkMode';
  StorageKey!: string;
  retrievedMode: any;
  isUserLoggedIn: boolean = false;
  UserInfo!: User[];
  showToastMessage: boolean = false;
  toastMessage!: string;
  toastType!: string;
  private subscription!: Subscription;

  constructor(
    private router: Router,
    private baseService: BaseService,
    private accountService: AccountService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
    this.baseService.setActiveRoute();

    this.isUserOnline();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  SelectedTheme(data: any) {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
  }

  isUserOnline() {
    if (this.accountService.fetchSignedInUserInfo()?.length) {
      this.UserInfo = this.accountService.fetchSignedInUserInfo();
      this.isUserLoggedIn = true;
    } else {
      this.router.navigate(['/Home']);
      this.isUserLoggedIn = false;
    }
  }

  OpenChangePasswordModal(): void {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent, {
      position: { top: '100px' },
    });

    this.subscription = dialogRef.afterClosed().subscribe((res) => {
      if (res.data != null) {
        let response = this.accountService.changeUserPasswordByUserId(
          this.UserInfo[0].id,
          res.data
        );
        if (response == true) {
          this.displayToastMessage(
            'alert-success',
            'The password has been successfully changed.'
          );
        } else {
          this.displayToastMessage(
            'alert-error',
            'Unable to save the new password.'
          );
        }
        this.closeToastMessage();
      }
    });
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
}
