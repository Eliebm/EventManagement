import { NgModule } from '@angular/core';
import { EventsComponent } from './events.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [EventsComponent],
  exports: [EventsComponent],
  imports: [CommonModule],
})
export class SharedEventsModule {}
