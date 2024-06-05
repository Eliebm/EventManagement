import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsPageRoutingModule } from './groups-page-routing.module';
import { GroupsPageComponent } from './groups-page.component';
import { SharedNavBarModule } from '../Shared-Components/nav-bar/nav-bar.module';
import { GroupDetailsComponent } from './group-details/group-details.component';

@NgModule({
  declarations: [GroupsPageComponent, GroupDetailsComponent],
  imports: [CommonModule, GroupsPageRoutingModule, SharedNavBarModule],
})
export class GroupsPageModule {}
