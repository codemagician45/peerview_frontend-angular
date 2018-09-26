import {
	Component
} from '@angular/core';
import {
	ActivatedRoute,
	Params
} from '@angular/router';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from '@angular/material';
import {
	CreateCommunityComponent
} from '../../shared/modals';
@Component({
	selector: 'private-community-component',
	templateUrl: './private-community.component.html',
	styleUrls: ['./private-community.component.scss']
})
export class PrivateCommunityComponent {
	constructor (
		private dialog: MatDialog,
    private overlay: Overlay
	) {}

	protected selectedCommunitySelected: string = 'discoverCommunity';

	protected onSelectCommunityType (type): void {
		this.selectedCommunitySelected = type;
	}

	protected onCreateCommunity (): void {
		let dialogConfig = new MatDialogConfig();
		dialogConfig.panelClass = 'create-community-modal';
		dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
		this.dialog.open(CreateCommunityComponent, dialogConfig);
	}
}
