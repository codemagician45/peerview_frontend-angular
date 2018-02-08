import {
  Component,
  OnInit
} from '@angular/core';
import {
  ForumService
} from '../../../services/services';

@Component({
  selector: 'app-top-questions',
  templateUrl: './top-questions.component.html',
  styleUrls: ['./top-questions.component.scss']
})
export class TopQuestionsComponent implements OnInit {
  constructor (private _forumservice: ForumService) {}

  protected allquestions: any[] = [];

  public ngOnInit (): void {
    this._forumservice.getPopularQuestions()
    .subscribe((response: any) => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}
