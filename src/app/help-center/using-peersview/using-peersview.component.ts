import {
  Component,
  Inject,
  AfterViewInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';


@Component({
  selector: 'using-peersview-component',
  templateUrl: './using-peersview.component.html',
  styleUrls: ['./using-peersview.component.scss']
})
export class UsingPeersviewComponent {
  constructor(@Inject(Window) private window: Window, private activedRoute: ActivatedRoute) {


  }


}
