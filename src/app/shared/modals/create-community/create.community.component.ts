import {
	Component,
	OnInit,
	Inject
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
	PrivateCommunityModel
} from '../../../shared/models';
import {
	CommunityApiService
} from '../../../../services/api';

@Component({
	selector: 'create-community-modal-component',
	templateUrl: './create.community.component.html',
	styleUrls: ['./create.community.component.scss']
})
export class CreateCommunityComponent implements OnInit {
	constructor (
    @Inject(MAT_DIALOG_DATA) protected comunityDetailData: any,
		private dialog: MatDialog,
		private communityApiService: CommunityApiService,
	) {}

	protected privateCommunity: PrivateCommunityModel = new PrivateCommunityModel;

	public ngOnInit (): void {}

	protected onSubmit (valid): void {
		console.log(this.privateCommunity);
		this.communityApiService.promiseCreatePrivateCommunity(this.privateCommunity)
		.then(() => {})
		.catch(error => {
			console.log(error);
		});
	}

	protected onTagsChanged (item): void {
		console.log(item);
	}
}
