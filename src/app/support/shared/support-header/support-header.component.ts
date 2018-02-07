import {
  Component,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-support-header',
  templateUrl: './support-header.component.html',
  styleUrls: ['./support-header.component.scss']
})
export class SupportHeaderComponent implements OnInit {
  constructor () {}

  @Input('header') public header: string;
  @Input('sub_header') public sub_header: string;
  @Input('nav-name') public navName: string;

  public ngOnInit (): void {}
}
