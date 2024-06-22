import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsPageComponent } from './events-page.component';
import { CreateNewEventComponent } from './create-new-event/create-new-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EditEventInfoComponent } from './edit-event-info/edit-event-info.component';
import { AllEventAdministratorComponent } from './all-Event-administrator/all-Event-administrator.component';
import { AllEventMembersComponent } from './all-Event-members/all-Event-members.component';

const routes: Routes = [
  { path: '', component: EventsPageComponent },
  { path: 'createNewEvent', component: CreateNewEventComponent },
  { path: ':id', component: EventDetailsComponent },
  { path: ':id/editEvent', component: EditEventInfoComponent },
  { path: ':id/admins', component: AllEventAdministratorComponent },
  { path: ':id/members', component: AllEventMembersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsPageRoutingModule {}
