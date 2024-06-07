import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../Service/baseService/base.service';
import { EventGroupsService } from '../../Service/event-groups.service';
import { EventGroup } from '../../Models/eventGroup.Models';
import { AdminListComponent } from './admin-list/admin-list.component';
import { MatDialog } from '@angular/material/dialog';
import { AddAdminModalComponent } from './add-admin-modal/add-admin-modal.component';
import { User } from '../../Models/user.Models';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrl: './group-details.component.scss',
})
export class GroupDetailsComponent implements OnInit {
  themeStorageKey: string = 'DarkMode';
  StorageKey!: string;
  retrievedMode: any;
  isUserLoggedIn: boolean = false;
  isAnAdministrator: boolean = false;
  groupId: any;
  UserInfo: User[] = [];
  groupInfos!: EventGroup[];
  showToastMessage: boolean = false;
  toastMessage!: string;
  toastType!: string;

  constructor(
    private _eventGroupsService: EventGroupsService,
    private _route: ActivatedRoute,
    private dialog: MatDialog,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.baseService.setActiveRoute();
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
    this.groupId = this._route.snapshot.paramMap.get('id');
    this.fetchGroupInfos();
    this.isUserOnline();
    this.IsUserAnAdmin();
  }

  isUserOnline() {
    let data = localStorage.getItem('loggedInUser');
    if (data?.length) {
      this.UserInfo = JSON.parse(data);
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
  }
  SelectedTheme(data: any) {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
  }

  fetchGroupInfos(): void {
    this.groupInfos = this._eventGroupsService.fetchEventGroupById(
      this.groupId
    );
  }

  openAddDialog(): void {
    const dialogRef = this.dialog
      .open(AddAdminModalComponent, {})
      .afterClosed()
      .subscribe((res) => {
        if (res.data === null) {
        } else {
          if (
            this._eventGroupsService.addAdministratorToEventGroup(
              this.groupId,
              res.data
            ) === 'true'
          ) {
            this.showToastMessage = true;
            this.toastMessage = 'Admin Added Successfully.';
            this.toastType = 'alert-success';
            this.fetchGroupInfos();
          } else if (
            this._eventGroupsService.addAdministratorToEventGroup(
              this.groupId,
              res.data
            ) === 'error'
          ) {
            this.showToastMessage = true;
            this.toastMessage = 'Error: User Credentials Do Not Exist.';
            this.toastType = 'alert-error';
          } else {
            this.showToastMessage = true;
            this.toastMessage = 'Error: Admin Already Exists.';
            this.toastType = 'alert-error';
          }
          setTimeout(() => {
            this.showToastMessage = false;
          }, 3000);
        }
      });
  }

  IsUserAnAdmin(): void {
    if (this.isUserLoggedIn === true) {
      let userId = this.UserInfo[0].id;

      this.isAnAdministrator = this._eventGroupsService.isUserAdministrator(
        this.groupId,
        userId
      );
    } else {
      this.isAnAdministrator = false;
    }
  }
}
