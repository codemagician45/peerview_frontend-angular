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
} from '../../../../../services';

@Component({
    selector: 'create-ad-groups-targeting-component',
    templateUrl: './targeting.component.html',
    styleUrls: ['./targeting.component.scss']
})
export class CreateAdGroupsTargetingComponent implements OnInit, OnDestroy {
    constructor (
        private route: ActivatedRoute,
        public linkifyService: NgxLinkifyjsService
    ) {
    }

    protected user = UserService.getUser();

    public ngOnInit (): void {
        console.log(this.route.snapshot.params['id']);
    }

    public ngOnDestroy (): void {
        // this.routeSubscriber.unsubscribe();
        // this.postSaveSubscriber.unsubscribe();
    }
}
