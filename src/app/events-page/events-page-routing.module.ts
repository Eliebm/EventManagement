import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsPageComponent } from './events-page.component';
import { CreateNewEventComponent } from './create-new-event/create-new-event.component';

const routes: Routes = [
  { path: '', component: EventsPageComponent },
  { path: 'createNewEvent', component: CreateNewEventComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsPageRoutingModule {}
