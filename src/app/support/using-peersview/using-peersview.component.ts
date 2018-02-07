import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-using-peersview',
  templateUrl: './using-peersview.component.html',
  styleUrls: ['./using-peersview.component.scss']
})
export class UsingPeersviewComponent implements OnInit {
  constructor () {}

  public header = 'Using Peersview';
  public sub_header = '';

  public ngOnInit (): void {}
}

