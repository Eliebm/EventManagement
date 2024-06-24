import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { SharedComponentsModule } from '../Shared-Components/shared-components.module';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { UserEventsComponent } from './user-events/user-events.component';
import { UserGroupsComponent } from './user-groups/user-groups.component';

@NgModule({
  declarations: [ProfilePageComponent, ChangePasswordModalComponent, UserEventsComponent, UserGroupsComponent],
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    SharedComponentsModule,
    FormsModule,
    MatDialogModule,
  ],
})
export class ProfilePageModule {}
