import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../Service/baseService/base.service';
import { EventGroupsService } from '../../Service/event-groups.service';
import { EventGroup } from '../../Models/eventGroup.Models';
import { MatDialog } from '@angular/material/dialog';
import { AddAdminModalComponent } from '../../Shared-Components/add-admin-modal/add-admin-modal.component';
import { User } from '../../Models/user.Models';
import { EventClass } from '../../Models/event.Models';
import { EventServicesService } from '../../Service/event-services.service';

import { DeleteMemberModalComponent } from '../../Shared-Components/delete-member-modal/delete-member-modal.component';

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
  allEvents?: EventClass[];
  showToastMessage: boolean = false;
  toastMessage!: string;
  toastType!: string;
  isJoined: boolean = false;

  constructor(
    private _eventGroupsService: EventGroupsService,
    private _route: ActivatedRoute,
    private dialog: MatDialog,
    private baseService: BaseService,
    private eventService: EventServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.baseService.setActiveRoute();
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
    this.groupId = this._route.snapshot.paramMap.get('id');
    this.fetchGroupInfos();
    this.isUserOnline();
    this.IsUserAnAdmin();
    this.fetchListOfEventsByGroupId();
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

  openAddAdminDialog(): void {
    const dialogRef = this.dialog
      .open(AddAdminModalComponent, { position: { top: '90px' } })
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
            this.displayToastMessage(
              'alert-success',
              'Admin Added Successfully.'
            );
            this.fetchGroupInfos();
          } else if (
            this._eventGroupsService.addAdministratorToEventGroup(
              this.groupId,
              res.data
            ) === 'error'
          ) {
            this.displayToastMessage(
              'alert-error',
              'Error: User Credentials Do Not Exist.'
            );
          } else {
            this.displayToastMessage(
              'alert-error',
              'Error: Admin Already Exists.'
            );
          }
        }
        this.closeToastMessage();
      });
  }

  editGroup(): void {
    this.router.navigate(['/Groups/' + this.groupId + '/editGroup']);
  }

  addNewEventToGroup(): void {
    this.router.navigate(['/Groups/' + this.groupId + '/newEvent']);
  }

  IsUserAnAdmin(): void {
    if (this.isUserLoggedIn === true) {
      let userId = this.UserInfo[0].id;

      this.isAnAdministrator = this._eventGroupsService.isUserAdministrator(
        this.groupId,
        userId
      );
      this.checkIfUserHasJoinedGroup();
    } else {
      this.isAnAdministrator = false;
    }
  }

  async fetchListOfEventsByGroupId() {
    try {
      this.allEvents = await this._eventGroupsService.fetchEventByGroupId(
        this.groupId
      );
    } catch (error) {
      this.displayToastMessage('alert-error', 'Error fetching local data:');
      this.closeToastMessage();
    }
  }

  AttendAnEvent(eventId: any): void {
    let userId = this.UserInfo[0].id;
    let msg;

    msg = this.eventService.addUserToEvent(this.groupId, eventId, userId);
    if (msg === 'error_1') {
      this.displayToastMessage('alert-error', 'The user does not exist!');
    } else if (msg === 'error_2') {
      this.displayToastMessage(
        'alert-warning',
        'You have already joined this event'
      );
    } else {
      this.displayToastMessage(
        'alert-success',
        'You have successfully joined the event.'
      );

      this.fetchListOfEventsByGroupId();
    }
    this.closeToastMessage();
  }

  checkIfUserHasJoinedGroup(): void {
    let userId = this.UserInfo[0].id;
    if (
      this._eventGroupsService.checkIfUserIsAMember(this.groupId, userId) ===
      true
    ) {
      this.isJoined = true;
    }
  }

  joinTheGroup(): void {
    if (this.isUserLoggedIn === true) {
      let userId = this.UserInfo[0].id;
      if (
        this._eventGroupsService.checkIfUserIsAMember(this.groupId, userId) ===
        true
      ) {
        this.displayToastMessage(
          'alert-warning',
          'You have already joined this Group'
        );
      } else {
        if (
          this._eventGroupsService.addUserToMembers(
            this.groupId,
            this.UserInfo
          ) === true
        ) {
          this.displayToastMessage(
            'alert-success',
            'You have successfully joined this Group'
          );
          this.isJoined = true;
          this.fetchGroupInfos();
        }
      }
    } else {
      this.displayToastMessage(
        'alert-error',
        'You need to log in before you can join the group.'
      );
    }
    this.closeToastMessage();
  }

  leaveTheGroup(): void {
    const dialogRef = this.dialog
      .open(DeleteMemberModalComponent, {
        data: {
          title: 'Leave Group',
          description: 'Are you sure you want to leave the group?',
          buttonTitle: 'Leave',
        },
        position: { top: '90px' },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res.data !== null) {
          let userID = this.UserInfo[0].id;
          let response = this._eventGroupsService.deleteMember(
            this.groupId,
            userID
          );
          if (response == true) {
            this.displayToastMessage('alert-warning', "You've left the group.");
            this.closeToastMessage();
            this.isJoined = false;
            this.fetchGroupInfos();
          }
        }
      });
  }

  showMoreMember(): void {
    if (this.isUserLoggedIn === true) {
      this.router.navigate([`/Groups/${this.groupId}/members`], {
        queryParams: { param1: this.groupId, param2: this.isAnAdministrator },
      });
    } else {
      this.router.navigate(['/Login']);
    }
  }

  showAllAdministrators(): void {
    this.router.navigate(['/Groups/' + this.groupId + '/admins'], {
      queryParams: { param1: this.groupId },
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
