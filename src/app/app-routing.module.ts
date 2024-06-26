import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'Home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'Login',
    loadChildren: () =>
      import('./log-in/log-in.module').then((m) => m.LogInModule),
  },
  {
    path: 'Signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: 'Groups',
    loadChildren: () =>
      import('./groups-page/groups-page.module').then(
        (m) => m.GroupsPageModule
      ),
  },
  {
    path: 'Events',
    loadChildren: () =>
      import('./events-page/events-page.module').then(
        (m) => m.EventsPageModule
      ),
  },
  {
    path: 'Profile',
    loadChildren: () =>
      import('./profile-page/profile-page.module').then(
        (m) => m.ProfilePageModule
      ),
  },
  {
    path: 'ApiRequest',
    loadChildren: () =>
      import('./rest-request/rest-request.module').then(
        (m) => m.RestRequestModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
