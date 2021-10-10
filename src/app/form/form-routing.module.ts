import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './form.component';
import { AnswersComponent } from './views/answers/answers.component';
import { BuilderComponent } from './views/builder/builder.component';
import { QuestionnaireBuilderComponent } from './components/questionnaire-builder/questionnaire-builder.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'builder' },
  { path: 'builder', component: BuilderComponent },
  { path: 'answers', component: AnswersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}

export const components = [
  AnswersComponent,
  BuilderComponent,
  FormComponent,
  QuestionnaireComponent,
  QuestionnaireBuilderComponent,
];
