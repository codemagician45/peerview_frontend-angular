export class PollModel {
  public question: string;
  public options: Array<string> = ['', ''];
  public duration: number;
}

export class Polls {
  public polls: Array<PollModel>;
}
