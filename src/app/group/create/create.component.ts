import {
  Component,
  OnInit
} from '@angular/core';
import {
  CommunityService
} from '../../../services/services';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  constructor (private _communityservice: CommunityService) {}

  public group: any = {};

  public ngOnInit (): void {}

  protected creategroup (): void {
    this._communityservice.creategroup(this.group)
    .subscribe((response: any) => {
      console.log(response);
    }, error => {
      console.error('Error Creating Posts');
      console.error(error);
    });
  }
}
