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
  }

  rateUS(): void {
    alert('rating');
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
}
