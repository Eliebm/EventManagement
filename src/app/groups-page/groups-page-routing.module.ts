import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsPageComponent } from './groups-page.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { AllMembersComponent } from './all-members/all-members.component';
import { AllAdministratorComponent } from './all-administrator/all-administrator.component';
import { CreateNewGroupComponent } from './create-new-group/create-new-group.component';
import { EditGroupComponent } from './edit-group/edit-group.component';

const routes: Routes = [
  { path: '', component: GroupsPageComponent },
  { path: 'createNewGroup', component: CreateNewGroupComponent },
  { path: ':id', component: GroupDetailsComponent },
  { path: ':id/members', component: AllMembersComponent },
  { path: ':id/admins', component: AllAdministratorComponent },
  { path: ':id/editGroup', component: EditGroupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsPageRoutingModule {}
