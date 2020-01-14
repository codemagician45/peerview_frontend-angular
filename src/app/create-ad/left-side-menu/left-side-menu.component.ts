import {
    Component,
    Input
} from '@angular/core';
import {
    ActivatedRoute,
    Router,
    Params
} from '@angular/router';
import {
    CampusApiService
} from '../../../services/api/campus.api.service';
import {
    CryptoUtilities
} from '../../shared/utilities';
import {
    CampusClassModel
} from '../../shared/models';

@Component({
    selector: 'create-ad-left-side-menu-component',
    templateUrl: './left-side-menu.component.html',
    styleUrls: ['./left-side-menu.component.scss']
})
export class CreateAdLeftSideMenuComponent {
    constructor (
        private route: ActivatedRoute,
        private campusApiService: CampusApiService,
        private router: Router
    ) { }

    public ngOnInit (): void {
        this.route.params.subscribe((params: Params) => {
        });
    }
}
