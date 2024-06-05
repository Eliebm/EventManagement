import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedEventsModule } from '../events/events.module';
import { SharedEventsGroupsModule } from '../event-groups/event-groups.module';
import { SharedNavBarModule } from '../Shared-Components/nav-bar/nav-bar.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedEventsModule,
    SharedEventsGroupsModule,
    SharedNavBarModule,
  ],
})
export class HomeModule {}
