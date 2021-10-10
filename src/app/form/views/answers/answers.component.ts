import { Component, OnInit } from '@angular/core';
import { QuestionType } from '../../models/enums/question-type';
import { Answer } from '../../models/interfaces/answer';
import { Option } from '../../models/interfaces/option';
import { FormService } from '../../services/form.service';

@Component({
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
})
export class AnswersComponent implements OnInit {
  answers: Array<Answer>;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.getAnswers();
  }

  private isCheckboxList(type: string) {
    return type === QuestionType.CheckboxList;
  }

  private getAnswers() {
    const answers = this.formService.getAnswers();

    if (answers) {
      this.answers = answers.map((answerItem) => {
        if (this.isCheckboxList(answerItem.type)) {
          const { answer } = answerItem;

          answerItem.answer = (answer as Array<Option>)
            .filter((a) => a.isSelected)
            ?.map((a) => {
              return a.name;
            })
            .join(', ');
        }

        return answerItem;
      });
    }
  }
}
