import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EventsComponent } from './events/events.component';
import { EventGroupsComponent } from './event-groups/event-groups.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MemberListComponent } from './member-list/member-list.component';
import { ExtendedMemberListComponent } from './extended-member-list/extended-member-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteMemberModalComponent } from './delete-member-modal/delete-member-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CreateEventFormComponent } from './create-event-form/create-event-form.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { CountDownComponentComponent } from './count-down-component/count-down-component.component';

@NgModule({
  declarations: [
    NavBarComponent,
    EventsComponent,
    EventGroupsComponent,
    SearchBarComponent,

    MemberListComponent,
    ExtendedMemberListComponent,
    DeleteMemberModalComponent,
    CreateEventFormComponent,
    TimePickerComponent,
    CountDownComponentComponent,
  ],
  exports: [
    NavBarComponent,
    EventsComponent,
    EventGroupsComponent,
    SearchBarComponent,
    MemberListComponent,
    ExtendedMemberListComponent,
    DeleteMemberModalComponent,
    CreateEventFormComponent,
    CountDownComponentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
})
export class SharedComponentsModule {}
