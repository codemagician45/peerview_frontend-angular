import {
  Component,
  Input
} from '@angular/core';
import {
  PostModel,
} from '../../models';

@Component({
  selector: 'shared-post-component',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class SharedPostComponent {
  constructor () {}

  @Input() protected posts: Array<PostModel>;
}
