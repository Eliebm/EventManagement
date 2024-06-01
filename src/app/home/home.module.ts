import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { EventGroupsComponent } from '../event-groups/event-groups.component';

@NgModule({
  declarations: [HomeComponent, NavBarComponent, EventGroupsComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
