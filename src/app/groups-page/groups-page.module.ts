import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsPageRoutingModule } from './groups-page-routing.module';
import { GroupsPageComponent } from './groups-page.component';

import { GroupDetailsComponent } from './group-details/group-details.component';
import { SharedComponentsModule } from '../Shared-Components/shared-components.module';

@NgModule({
  declarations: [GroupsPageComponent, GroupDetailsComponent],
  imports: [CommonModule, GroupsPageRoutingModule, SharedComponentsModule],
})
export class GroupsPageModule {}
