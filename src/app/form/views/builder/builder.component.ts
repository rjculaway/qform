import { Component, OnInit } from '@angular/core';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { QuestionnaireBuilderComponent } from '../../components/questionnaire-builder/questionnaire-builder.component';

import { FormService } from '../../services/form.service';

@Component({
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent implements OnInit {
  hasQuestions: boolean;

  private addQuestionWindow: NbWindowRef;

  constructor(
    private formService: FormService,
    private windowService: NbWindowService
  ) {}

  ngOnInit(): void {
    this.checkIfHasQuestions();
  }

  addQuestion() {
    this.addQuestionWindow = this.windowService.open(
      QuestionnaireBuilderComponent,
      { title: 'Add a New Question' }
    );
  }

  closeAddQuestionWindow() {
    this.addQuestionWindow.close();
  }

  private checkIfHasQuestions() {
    this.hasQuestions = this.formService.getQuestions()?.length > 0;
  }
}
