import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestRequestRoutingModule } from './rest-request-routing.module';
import { RestRequestComponent } from './rest-request.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RestRequestComponent],
  imports: [CommonModule, RestRequestRoutingModule, FormsModule],
})
export class RestRequestModule {}
