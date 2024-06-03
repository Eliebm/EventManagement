import { NgModule } from '@angular/core';
import { EventGroupsComponent } from './event-groups.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [EventGroupsComponent],
  exports: [EventGroupsComponent],
  imports: [CommonModule],
})
export class SharedEventsGroupsModule {}
