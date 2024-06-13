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
import { GroupEventListComponent } from './group-details/group-event-list/group-event-list.component';
import { AllMembersComponent } from './all-members/all-members.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AllAdministratorComponent } from './all-administrator/all-administrator.component';

@NgModule({
  declarations: [
    GroupsPageComponent,
    GroupDetailsComponent,
    ChipButtonComponent,
    AdminListComponent,
    AddAdminModalComponent,
    GroupEventListComponent,
    AllMembersComponent,
    AllAdministratorComponent,
  ],
  imports: [
    CommonModule,
    GroupsPageRoutingModule,
    SharedComponentsModule,
    MatDialogModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
  ],
})
export class GroupsPageModule {}
