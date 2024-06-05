import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsPageComponent } from './groups-page.component';
import { GroupDetailsComponent } from './group-details/group-details.component';

const routes: Routes = [
  { path: '', component: GroupsPageComponent },
  { path: ':id', component: GroupDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsPageRoutingModule {}
