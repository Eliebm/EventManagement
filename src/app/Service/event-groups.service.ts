import { Injectable } from '@angular/core';
import { EventGroup } from '../Models/eventGroup.Models';
import { staticGroupEvent } from '../Models/staticData.Models';
import { User } from '../Models/user.Models';
import { BaseService } from './baseService/base.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EventGroupsService {
  protected staticEventGroups: EventGroup[] = staticGroupEvent;

  user: User[] = [];
  private storageKey: any;

  constructor(private baseService: BaseService, private router: Router) {
    this.storageKey = 'Groups-Of-Events';
  }

  setStaticData(): void {
    if (!localStorage.getItem(this.storageKey)?.length) {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.staticEventGroups)
      );
    }
  }
}
