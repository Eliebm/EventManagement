import { Component, HostBinding, OnInit, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../Service/account.service';
import { EventGroup } from '../Models/eventGroup.Models';

import { EventClass } from '../Models/event.Models';
import { BaseService } from '../Service/baseService/base.service';
import { EventGroupsService } from '../Service/event-groups.service';
import { EventServicesService } from '../Service/event-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  themeStorageKey: string = 'DarkMode';
  StorageKey!: string;
  retrievedMode: any;
  EventGroups: EventGroup[] = [];
  allEvents: EventClass[] = [];

  constructor(
    private baseService: BaseService,
    private eventGroupService: EventGroupsService,
    private eventService: EventServicesService
  ) {}

  ngOnInit(): void {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
    this.baseService.setActiveRoute();
    this.fetchEventGroups();
    this.fetchAllEvents();
  }

  SelectedTheme(data: any) {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
  }

  fetchEventGroups(): void {
    this.EventGroups = this.eventGroupService.getEventGroups();
  }

  fetchAllEvents(): void {
    this.allEvents = this.eventService.getAllEvents();
  }
}
