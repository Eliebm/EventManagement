import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsPageComponent } from './groups-page.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { AllMembersComponent } from './all-members/all-members.component';
import { AllAdministratorComponent } from './all-administrator/all-administrator.component';

const routes: Routes = [
  { path: '', component: GroupsPageComponent },
  { path: ':id', component: GroupDetailsComponent },
  { path: ':id/members', component: AllMembersComponent },
  { path: ':id/admins', component: AllAdministratorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsPageRoutingModule {}
