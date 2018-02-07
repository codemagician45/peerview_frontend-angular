import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-fix-problem',
  templateUrl: './fix-problem.component.html',
  styleUrls: ['./fix-problem.component.scss']
})
export class FixProblemComponent implements OnInit {
  constructor () {}

  public header = 'Fix a Problem';
  public sub_header = '';

  public ngOnInit (): void {}
}
