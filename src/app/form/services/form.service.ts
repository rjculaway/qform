import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Answer } from '../models/interfaces/answer';
import { Question } from '../models/interfaces/question';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  $questions: Subject<Array<Question>> = new Subject<Array<Question>>();
  private questions: Array<Question>;
  private answers: Array<Answer>;

  constructor() {}

  saveAnswers(answers: Array<Answer>) {
    this.answers = answers;
  }

  getAnswers() {
    return this.answers;
  }

  saveQuestions(question: Question) {
    if (!this.questions) {
      this.questions = [question];
    } else {
      this.questions.push(question);
    }

    this.$questions.next(this.questions);
  }

  getQuestions() {
    return this.questions;
  }
}
