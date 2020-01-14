import {
    Component,
    OnDestroy,
    OnInit
} from '@angular/core';
import {
    ActivatedRoute
} from '@angular/router';
import { NgxLinkifyjsService, Link } from 'ngx-linkifyjs';
import {
    UserService
} from '../../../services';

@Component({
    selector: 'create-ad-review-component',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss']
})
export class CreateAdReviewComponent implements OnInit, OnDestroy {
    constructor (
        private route: ActivatedRoute,
        public linkifyService: NgxLinkifyjsService
    ) {
    }

    protected user = UserService.getUser();

    public ngOnInit (): void {

    }

    public ngOnDestroy (): void {
        // this.routeSubscriber.unsubscribe();
        // this.postSaveSubscriber.unsubscribe();
    }
}
