import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { SharedEventsModule } from '../events/events.module';
import { SharedEventsGroupsModule } from '../event-groups/event-groups.module';

@NgModule({
  declarations: [HomeComponent, NavBarComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedEventsModule,
    SharedEventsGroupsModule,
  ],
})
export class HomeModule {}
