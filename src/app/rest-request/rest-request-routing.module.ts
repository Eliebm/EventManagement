import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestRequestComponent } from './rest-request.component';

const routes: Routes = [{ path: '', component: RestRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestRequestRoutingModule { }
