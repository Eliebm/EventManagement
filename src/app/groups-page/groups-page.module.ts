import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsPageRoutingModule } from './groups-page-routing.module';
import { GroupsPageComponent } from './groups-page.component';

import { GroupDetailsComponent } from './group-details/group-details.component';
import { SharedComponentsModule } from '../Shared-Components/shared-components.module';
import { ChipButtonComponent } from './chip-button/chip-button.component';

import { AddAdminModalComponent } from '../Shared-Components/add-admin-modal/add-admin-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { GroupEventListComponent } from './group-details/group-event-list/group-event-list.component';
import { AllMembersComponent } from './all-members/all-members.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AllAdministratorComponent } from './all-administrator/all-administrator.component';
import { CreateNewGroupComponent } from './create-new-group/create-new-group.component';
import { GroupFormFieldComponent } from './create-new-group/group-form-field/group-form-field.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { NewEventComponent } from './new-event/new-event.component';

@NgModule({
  declarations: [
    GroupsPageComponent,
    GroupDetailsComponent,
    ChipButtonComponent,
    AddAdminModalComponent,
    GroupEventListComponent,
    AllMembersComponent,
    AllAdministratorComponent,
    CreateNewGroupComponent,
    GroupFormFieldComponent,
    EditGroupComponent,
    NewEventComponent,
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
