import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EventsComponent } from './events/events.component';
import { EventGroupsComponent } from './event-groups/event-groups.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    NavBarComponent,
    EventsComponent,
    EventGroupsComponent,
    SearchBarComponent,
  ],
  exports: [
    NavBarComponent,
    EventsComponent,
    EventGroupsComponent,
    SearchBarComponent,
  ],
  imports: [CommonModule, RouterModule],
})
export class SharedComponentsModule {}
