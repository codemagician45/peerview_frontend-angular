import {
	Component,
	OnInit,
	Inject
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';

@Component({
	selector: 'create-community-modal-component',
	templateUrl: './create.community.component.html',
	styleUrls: ['./create.community.component.scss']
})
export class CreateCommunityComponent implements OnInit {
	constructor (
    @Inject(MAT_DIALOG_DATA) protected comunityDetailData: any,
    private dialog: MatDialog
	) {}

	public ngOnInit (): void {}
}
