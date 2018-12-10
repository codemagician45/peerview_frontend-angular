import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import {
  AdvanceSearchService
} from '../../../services/api';
<<<<<<< HEAD
import {
  ActivatedRoute
} from '@angular/router';
=======
>>>>>>> Merged and fixed conflict rebase

@Component({
  selector: 'advance-find-post-component',
  templateUrl: './find-post.component.html',
  styleUrls: ['./find-post.component.scss']
})
export class AdvanceSearchFindPostComponent {
  constructor (
<<<<<<< HEAD
    private advanceSeachService: AdvanceSearchService,
    private route: ActivatedRoute
=======
    private advanceSeachService: AdvanceSearchService
>>>>>>> Merged and fixed conflict rebase
  ) {}

  @Output() private postSearchEvent: EventEmitter<any> = new EventEmitter<any>();
  protected keyword: string;
<<<<<<< HEAD
  private routeSubscriber: any;

  public ngOnInit (): void {
    this.routeSubscriber = this.route
    .queryParams
    .subscribe(params => {
      this.keyword = params.k;
      this.keyword && this.onSearchPosts();
    });
  }
=======
>>>>>>> Merged and fixed conflict rebase

  protected onSearchPosts (): void {
    this.advanceSeachService.promiseGetAllSearchedPosts(this.keyword)
      .then(response => {
        this.postSearchEvent.emit(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
<<<<<<< HEAD

  public ngOnDestroy (): void {
    this.routeSubscriber.unsubscribe();
  }
=======
>>>>>>> Merged and fixed conflict rebase
}
