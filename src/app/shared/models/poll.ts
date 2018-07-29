import {
  Model
} from './model';

export class PollModel {
  public question: string;
  public options: Array<string> = ['', ''];
  public duration: number;
}

export class Polls {
  public polls: Array<PollModel>;
}

export class CreatePoll extends Model {
  public question: string;
  public options: Array<string> = [];
  public duration: number;

  public init (): void {
    this.setBlankDataStructure({
      question: '',
      options: [],
      duration: ''
    });
  }
}
