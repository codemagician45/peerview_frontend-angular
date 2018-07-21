export class PollModel {
  public question: string;
  public options: Array<Option>;
  public duration: number;
}

export class Polls {
  public polls: Array<PollModel>;
}

export class Option {
  public option: string;
}
