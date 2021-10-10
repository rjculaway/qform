import { QuestionType } from '../enums/question-type';

export interface Question {
  type: QuestionType;
  question: string;
  options: Array<string | number>;
}
