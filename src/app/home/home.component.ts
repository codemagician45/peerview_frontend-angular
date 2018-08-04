import {
  Component,
  OnInit
} from '@angular/core';
import {
  PostApiService
} from '../../services/api';
import {
  PostModel,
} from '../shared/models';
import {
  PostEmitter
} from '../shared/emitter';
import {
  UserClass
} from '../shared/classes';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor (private postApiService: PostApiService) {}

  protected posts: PostModel[] = [];
  protected user = UserClass.getUser();
  private limit = 5;
  private offset = 10;

  public ngOnInit (): void {
    this.getPosts();
  }

  private getPosts (): void {
    this.postApiService.promiseGetAllPost(10, 0)
    .then((responseData: PostModel[]) => {
      this.posts = responseData;
    })
    .catch(error => {

    });
  }
}
