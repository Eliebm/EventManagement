import { NgModule } from '@angular/core';
import { EventGroupsComponent } from './event-groups.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EventGroupsComponent],
  exports: [EventGroupsComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedEventsGroupsModule {}
