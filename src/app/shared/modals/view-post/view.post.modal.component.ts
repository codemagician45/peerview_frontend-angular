import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  PostModel
} from '../../models';
import {
  PostService
} from '../../../../services/services';

@Component({
  selector: 'app-view-post-modal-component',
  templateUrl: './view.post.modal.component.html',
  styleUrls: ['./view.post.modal.component.scss']
})
export class SharedViewPostModalComponent implements OnInit {
  constructor (@Inject (MAT_DIALOG_DATA)
  private post: PostModel,
  private postService: PostService
) {}

  public ngOnInit (): void {
    this.postService.viewpost(this.post.id)
    .subscribe(response => {
      console.log(response);
    });
  }
}
