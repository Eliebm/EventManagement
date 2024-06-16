import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../Service/baseService/base.service';
import { EventGroupsService } from '../Service/event-groups.service';
import { AccountService } from '../Service/account.service';
import { EventClass } from '../Models/event.Models';
import { User } from '../Models/user.Models';
import { EventServicesService } from '../Service/event-services.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.scss',
})
export class EventsPageComponent implements OnInit {
  themeStorageKey: string = 'DarkMode';
  StorageKey!: string;
  retrievedMode: any;
  allEvents: EventClass[] = [];
  showedAllEvents: EventClass[] = [];
  isUserLoggedIn: boolean = false;
  UserInfo!: User[];

  constructor(
    private router: Router,
    private baseService: BaseService,
    private eventService: EventServicesService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
    this.baseService.setActiveRoute();
    this.isUserOnline();

    this.fetchAllEvents();
  }

  SelectedTheme(data: any) {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
  }

  isUserOnline() {
    if (this.accountService.fetchSignedInUserInfo()?.length) {
      this.UserInfo = this.accountService.fetchSignedInUserInfo();
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
  }

  fetchAllEvents(): void {
    this.allEvents = this.eventService.getAllEvents();
    this.showedAllEvents = this.allEvents;
  }

  submitSearch(data: any): void {
    if (data === '') {
      this.showedAllEvents = this.allEvents;
    } else {
      this.showedAllEvents = this.allEvents.filter((x) =>
        x.title.toLocaleLowerCase().includes(data)
      );
    }
  }
}
