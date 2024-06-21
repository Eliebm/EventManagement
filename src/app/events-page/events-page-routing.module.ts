import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsPageComponent } from './events-page.component';
import { CreateNewEventComponent } from './create-new-event/create-new-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AllAdministratorComponent } from './all-administrator/all-administrator.component';
import { AllMembersComponent } from './all-members/all-members.component';
import { EditEventInfoComponent } from './edit-event-info/edit-event-info.component';

const routes: Routes = [
  { path: '', component: EventsPageComponent },
  { path: 'createNewEvent', component: CreateNewEventComponent },
  { path: ':id', component: EventDetailsComponent },
  { path: ':id/editEvent', component: EditEventInfoComponent },
  { path: ':id/admins', component: AllAdministratorComponent },
  { path: ':id/members', component: AllMembersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsPageRoutingModule {}
