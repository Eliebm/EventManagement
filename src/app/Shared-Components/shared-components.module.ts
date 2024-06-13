import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EventsComponent } from './events/events.component';
import { EventGroupsComponent } from './event-groups/event-groups.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { RouteBreadCrumbsComponent } from './route-bread-crumbs/route-bread-crumbs.component';
import { MemberListComponent } from './member-list/member-list.component';
import { ExtendedMemberListComponent } from './extended-member-list/extended-member-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteMemberModalComponent } from './delete-member-modal/delete-member-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    NavBarComponent,
    EventsComponent,
    EventGroupsComponent,
    SearchBarComponent,
    RouteBreadCrumbsComponent,
    MemberListComponent,
    ExtendedMemberListComponent,
    DeleteMemberModalComponent,
  ],
  exports: [
    NavBarComponent,
    EventsComponent,
    EventGroupsComponent,
    SearchBarComponent,
    RouteBreadCrumbsComponent,
    MemberListComponent,
    ExtendedMemberListComponent,
    DeleteMemberModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
  ],
})
export class SharedComponentsModule {}
