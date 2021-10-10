import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { QuestionType } from '../../models/enums/question-type';
import { Question } from '../../models/interfaces/question';
import { Option } from '../../models/interfaces/option';
import { FormService } from '../../services/form.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'qform-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionnaireComponent implements OnInit, OnDestroy {
  questions: Array<Question>;
  questionsFormGroup: FormGroup;
  questionsFormArray: FormArray;

  private $subscribeToQuestions: Subscription;

  constructor(
    private formService: FormService,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getQuestions();
    this.initQuestionsFormGroup();
  }

  ngOnDestroy(): void {
    if (this.$subscribeToQuestions) {
      this.$subscribeToQuestions.unsubscribe();
    }
  }

  getFormGroup(question: any) {
    return question as FormGroup;
  }

  getAnswersControls(formGroup: any) {
    return (formGroup.get('answer') as FormArray).controls;
  }

  reviewAnswers() {
    if (
      this.questionsFormArray.valid &&
      this.questionsFormArray.dirty &&
      this.questions
    ) {
      this.formService.saveAnswers(this.questionsFormArray.value);
      this.router.navigate(['../answers'], { relativeTo: this.activatedRoute });
    }
  }

  private getQuestions() {
    this.$subscribeToQuestions = this.formService.$questions.subscribe(
      (questions) => {
        this.questions = questions;

        this.initQuestionsFormGroup();
        this.changeDetectorRef.detectChanges();
      }
    );
  }

  private initQuestionsFormGroup() {
    this.questionsFormArray = new FormArray([]);
    if (this.questions) {
      this.questions.forEach((question, index) => {
        const questionFormGroup = this.createQuestionFormGroup(question);

        this.questionsFormArray.push(questionFormGroup);
      });
    }
  }

  private createQuestionFormGroup(questionValue: Question) {
    const { question, type, options } = questionValue;
    const questionFormGroup = new FormGroup({
      question: new FormControl(),
      type: new FormControl(),
    });

    let answer: FormControl | FormArray;

    if (this.isCheckboxList(type)) {
      answer = this.getOptionsArray(options);
    } else {
      answer = new FormControl(null, [Validators.required]);
    }

    questionFormGroup.addControl('answer', answer);

    if (question) {
      questionFormGroup.patchValue(questionValue);
    }

    return questionFormGroup;
  }

  private getOptionsArray(options: Array<string | number>) {
    const optionsFormArray = new FormArray([]);

    options.forEach((option, index) => {
      const optionFormGroup = this.getOptionsFormGroup(option, index);
      optionsFormArray.push(optionFormGroup);
    });

    return optionsFormArray;
  }

  private getOptionsFormGroup(option: string | number, index: number) {
    const optionFormGroup = this.formBuilder.group({
      name: [option],
      value: [index],
      isSelected: [null],
    });

    return optionFormGroup;
  }

  isCheckboxList(type: string) {
    return type === QuestionType.CheckboxList;
  }
}
