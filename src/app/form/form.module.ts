import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule, components } from './form-routing.module';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbWindowModule,
} from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';

const nebularModules = [
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbCheckboxModule,
  NbSelectModule,
  NbIconModule,
  NbWindowModule.forChild(),
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    FormRoutingModule,
    ReactiveFormsModule,

    nebularModules,
  ],
})
export class FormModule {}
