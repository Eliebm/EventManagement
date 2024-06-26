import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { User } from '../../Models/user.Models';
import { EventClass } from '../../Models/event.Models';
import { EventGroupsService } from '../../Service/event-groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BaseService } from '../../Service/baseService/base.service';
import { EventServicesService } from '../../Service/event-services.service';
import { Subscription, interval } from 'rxjs';
import { AddAdminModalComponent } from '../../Shared-Components/add-admin-modal/add-admin-modal.component';
import { RatingModalComponent } from '../../Shared-Components/rating-modal/rating-modal.component';
import { DeleteMemberModalComponent } from '../../Shared-Components/delete-member-modal/delete-member-modal.component';
import { TimelineModalComponent } from './event-time-line/timeline-modal/timeline-modal.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  themeStorageKey: string = 'DarkMode';
  StorageKey!: string;
  retrievedMode: any;
  isUserLoggedIn: boolean = false;
  isAnAdministrator: boolean = false;
  eventId: any;
  UserInfo: User[] = [];
  eventInfos!: EventClass[];
  showToastMessage: boolean = false;
  toastMessage!: string;
  toastType!: string;
  isJoined: boolean = false;
  isLoading: boolean = false;
  private subscription!: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private dialog: MatDialog,
    private baseService: BaseService,
    private eventService: EventServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.baseService.setActiveRoute();
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
    this.eventId = this._route.snapshot.paramMap.get('id');
    this.fetchEventInfo();
    this.isUserOnline();
    this.IsUserAnAdmin();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openAddTimeLineModal(): void {
    let oldDate = new Date(this.eventInfos[0].startDate);

    const dialogRef = this.dialog.open(TimelineModalComponent, {
      position: { top: '90px' },
    });

    this.subscription = dialogRef.afterClosed().subscribe((res) => {
      if (res.data !== null) {
        let response = res.data;
        let oldTime = new Date(response.time);

        oldDate.setHours(oldTime.getHours());
        oldDate.setMinutes(oldTime.getMinutes());

        response.time = oldDate;
        let returnResponse = this.eventService.addTimeLineToEvent(
          this.eventId,
          response
        );
        if (returnResponse == true) {
          this.displayToastMessage(
            'alert-success',
            'Timeline successfully added'
          );
          this.fetchEventInfo();
        } else {
          this.displayToastMessage('alert-error', 'Unable to add a Timeline');
        }
      }
      this.closeToastMessage();
    });
  }

  rateUS(): void {
    if (this.isUserLoggedIn === true) {
      const dialogRef = this.dialog.open(RatingModalComponent, {
        position: { top: '90px' },
      });
      this.subscription = dialogRef.afterClosed().subscribe((res) => {
        if (res.data !== null) {
          if (res.data === 0) {
            this.displayToastMessage(
              'alert-warning',
              "you can't rate event with 0 star"
            );
            this.closeToastMessage();
          } else {
            let response = this.eventService.addRatingToEvent(
              this.eventId,
              this.UserInfo[0].id,
              res.data
            );

            if (response === true) {
              this.displayToastMessage(
                'alert-primary',
                'Rating Successfully Added '
              );
              this.fetchEventInfo();
            } else {
              this.displayToastMessage('alert-error', 'Error submitting Rate ');
            }

            this.closeToastMessage();
          }
        }
      });
    } else {
      this.router.navigate(['/Login']);
    }
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

  fetchEventInfo(): void {
    this.eventInfos = this.eventService.fetchEventInfoById(this.eventId);
  }

  IsUserAnAdmin(): void {
    if (this.isUserLoggedIn === true) {
      let userId = this.UserInfo[0].id;

      this.isAnAdministrator = this.eventService.isUserAdministrator(
        this.eventId,
        userId
      );
      this.checkIfUserHasJoinedEvent();
    } else {
      this.isAnAdministrator = false;
    }
  }

  checkIfUserHasJoinedEvent(): void {
    let userId = this.UserInfo[0].id;
    if (this.eventService.checkIfUserIsAMember(this.eventId, userId) === true) {
      this.isJoined = true;
    }
  }

  openAddAdminDialog(): void {
    const dialogRef = this.dialog.open(AddAdminModalComponent, {
      position: { top: '90px' },
    });

    this.subscription = dialogRef.afterClosed().subscribe((res) => {
      let submitResponse = this.eventService.addAdministratorToEventGroup(
        this.eventId,
        res.data
      );
      if (res.data === null) {
      } else {
        if (submitResponse === 'true') {
          this.displayToastMessage(
            'alert-success',
            'Admin Added Successfully.'
          );
          this.fetchEventInfo();
        } else if (submitResponse === 'error') {
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

  showAllAdministrators(): void {
    this.router.navigate(['/Events/' + this.eventId + '/admins'], {
      queryParams: { param1: this.eventId },
    });
  }

  showAllMembers(): void {
    if (this.isUserLoggedIn === true) {
      this.router.navigate([`/Events/${this.eventId}/members`], {
        queryParams: { param1: this.eventId, param2: this.isAnAdministrator },
      });
    } else {
      this.router.navigate(['/Login']);
    }
  }

  joinEvent(): void {
    let eveDate = new Date(this.eventInfos[0].startDate);
    let eveTime = new Date(this.eventInfos[0].startTime);
    let currentDate = new Date();
    eveDate.setHours(eveTime.getHours());
    eveDate.setMinutes(eveTime.getMinutes());

    if (this.isUserLoggedIn === false) {
      this.router.navigate(['/Login']);
    } else if (eveDate < currentDate) {
      this.displayToastMessage('alert-error', 'The event is finished.');
    } else {
      let groupId = this.eventService.checkIfEventBelongsToGroup(this.eventId);
      let response = this.eventService.addUserToEvent(
        groupId,
        this.eventId,
        this.UserInfo[0].id
      );
      if (response === 'error_1') {
        this.displayToastMessage('alert-error', 'The user does not exist!');
      } else {
        this.displayToastMessage(
          'alert-success',
          'You have successfully joined the event.'
        );
        this.fetchEventInfo();
        this.isJoined = true;
      }
    }
    this.closeToastMessage();
  }

  leaveEvent(): void {
    const dialogRef = this.dialog.open(DeleteMemberModalComponent, {
      data: {
        title: 'Leave Event',
        description: 'Are you sure you want to leave the event?',
        buttonTitle: 'Leave',
      },
      position: { top: '90px' },
    });
    this.subscription = dialogRef.afterClosed().subscribe((res) => {
      if (res.data !== null) {
        let userID = this.UserInfo[0].id;
        let response = this.eventService.deleteMember(this.eventId, userID);
        if (response == true) {
          this.displayToastMessage('alert-warning', "You've left the event.");
          this.closeToastMessage();
          this.isJoined = false;
          this.fetchEventInfo();
        }
      }
    });
  }

  deleteEvent(id: number): void {
    const dialogRef = this.dialog.open(DeleteMemberModalComponent, {
      data: {
        title: 'Delete Event',
        description: 'Are you sure about Deleting this Event?',
        buttonTitle: 'Delete',
      },
      position: { top: '50px' },
    });
    this.subscription = dialogRef.afterClosed().subscribe((res) => {
      if (res.data !== null) {
        let response = this.eventService.deleteEvent(id);
        if (response === true) {
          this.isLoading = true;
          this.displayToastMessage(
            'alert-success',
            'Event successfully delete'
          );
          setTimeout(() => {
            this.router.navigate(['/Events']);
          }, 4000);
        } else {
          this.displayToastMessage('alert-error', 'Unable to delete Event');
        }
      }
    });
    this.closeToastMessage();
  }

  EditEventInfos(id: any): void {
    this.router.navigate(['/Events/' + id + '/editEvent']);
  }

  deleteTimeLineById(timeId: number): void {
    let response = this.eventService.deleteTimeLine(this.eventId, timeId);
    if (response == true) {
      this.displayToastMessage(
        'alert-success',
        'Timeline Successfully Deleted'
      );
      this.fetchEventInfo();
    } else {
      this.displayToastMessage('alert-error', 'Failed to delete the timeline');
    }
    this.closeToastMessage();
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
