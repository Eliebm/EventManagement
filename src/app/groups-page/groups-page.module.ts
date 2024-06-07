import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsPageRoutingModule } from './groups-page-routing.module';
import { GroupsPageComponent } from './groups-page.component';

import { GroupDetailsComponent } from './group-details/group-details.component';
import { SharedComponentsModule } from '../Shared-Components/shared-components.module';
import { ChipButtonComponent } from './chip-button/chip-button.component';
import { AdminListComponent } from './group-details/admin-list/admin-list.component';
import { AddAdminModalComponent } from './group-details/add-admin-modal/add-admin-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GroupsPageComponent,
    GroupDetailsComponent,
    ChipButtonComponent,
    AdminListComponent,
    AddAdminModalComponent,
  ],
  imports: [
    CommonModule,
    GroupsPageRoutingModule,
    SharedComponentsModule,
    MatDialogModule,
    FormsModule,
  ],
})
export class GroupsPageModule {}
