import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsPageRoutingModule } from './events-page-routing.module';
import { EventsPageComponent } from './events-page.component';
import { SharedComponentsModule } from '../Shared-Components/shared-components.module';
import { CreateNewEventComponent } from './create-new-event/create-new-event.component';

@NgModule({
  declarations: [EventsPageComponent, CreateNewEventComponent],
  imports: [CommonModule, EventsPageRoutingModule, SharedComponentsModule],
})
export class EventsPageModule {}
