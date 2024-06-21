import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsPageRoutingModule } from './events-page-routing.module';
import { EventsPageComponent } from './events-page.component';
import { SharedComponentsModule } from '../Shared-Components/shared-components.module';
import { CreateNewEventComponent } from './create-new-event/create-new-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { GroupsPageModule } from '../groups-page/groups-page.module';
import { AllAdministratorComponent } from './all-administrator/all-administrator.component';
import { AllMembersComponent } from './all-members/all-members.component';
import { EditEventInfoComponent } from './edit-event-info/edit-event-info.component';

@NgModule({
  declarations: [
    EventsPageComponent,
    CreateNewEventComponent,
    EventDetailsComponent,
    AllAdministratorComponent,
    AllMembersComponent,
    EditEventInfoComponent,
  ],
  imports: [
    CommonModule,
    EventsPageRoutingModule,
    SharedComponentsModule,
    GroupsPageModule,
  ],
})
export class EventsPageModule {}
