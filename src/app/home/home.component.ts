import { Component, HostBinding, OnInit, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../Service/account.service';
import { EventGroup } from '../Models/eventGroup.Models';
import { EventBaseClass } from '../Models/baseClass.Models';
import { EventClass } from '../Models/event.Models';

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

  constructor(private router: Router, private accountService: AccountService) {}

  ngOnInit(): void {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
    this.fetchEventGroups();
    this.fetchedAllEvents();
  }

  SelectedTheme(data: any) {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
  }

  fetchEventGroups(): void {
    this.StorageKey = 'Groups-Of-Events';
    let data = localStorage.getItem(this.StorageKey);
    if (data?.length) {
      this.EventGroups = JSON.parse(data);
    }
  }

  fetchedAllEvents(): void {
    this.StorageKey = 'All-Events';
    let data = localStorage.getItem(this.StorageKey);
    if (data?.length) {
      this.allEvents = JSON.parse(data);
    }
  }
}
