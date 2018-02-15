import {
  Component
} from '@angular/core';

@Component({
  selector: 'shared-post-textarea-component',
  templateUrl: './post-textarea.component.html',
  styleUrls: ['./post-textarea.component.scss']
})
export class SharedPostTextareaComponent {
  constructor () {}

  protected postMessage: string;
}
