import { Option } from './option';

export interface Answer {
  question: string;
  type: string;
  answer: string | Array<Option>;
}
