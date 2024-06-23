import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsPageRoutingModule } from './events-page-routing.module';
import { EventsPageComponent } from './events-page.component';
import { SharedComponentsModule } from '../Shared-Components/shared-components.module';
import { CreateNewEventComponent } from './create-new-event/create-new-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { GroupsPageModule } from '../groups-page/groups-page.module';
import { EditEventInfoComponent } from './edit-event-info/edit-event-info.component';
import { AllEventAdministratorComponent } from './all-Event-administrator/all-Event-administrator.component';
import { AllEventMembersComponent } from './all-Event-members/all-Event-members.component';
import { EventTimeLineComponent } from './event-details/event-time-line/event-time-line.component';
import { TimelineModalComponent } from './event-details/event-time-line/timeline-modal/timeline-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { EvenOddPipe } from '../pipeFolder/even-odd.pipe';

@NgModule({
  declarations: [
    EventsPageComponent,
    CreateNewEventComponent,
    EventDetailsComponent,
    AllEventAdministratorComponent,
    AllEventMembersComponent,
    EditEventInfoComponent,
    EventTimeLineComponent,
    TimelineModalComponent,
    EvenOddPipe,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    EventsPageRoutingModule,
    SharedComponentsModule,
    GroupsPageModule,
  ],
})
export class EventsPageModule {}
