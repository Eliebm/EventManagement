import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EventsComponent } from './events/events.component';
import { EventGroupsComponent } from './event-groups/event-groups.component';

@NgModule({
  declarations: [NavBarComponent, EventsComponent, EventGroupsComponent],
  exports: [NavBarComponent, EventsComponent, EventGroupsComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedComponentsModule {}
