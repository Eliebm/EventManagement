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

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
})
export class EventDetailsComponent implements OnInit {
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

  rateUS(): void {
    if (this.isUserLoggedIn === true) {
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
    const dialogRef = this.dialog
      .open(AddAdminModalComponent, { position: { top: '90px' } })
      .afterClosed()
      .subscribe((res) => {
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
