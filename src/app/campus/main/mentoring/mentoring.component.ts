import {
	Component
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from '@angular/material';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
	BecomeMentorModalComponent
} from '../../../shared/modals';
@Component({
	selector: 'campus-mentoring-component',
	templateUrl: './mentoring.component.html',
	styleUrls: ['./mentoring.component.scss']
})
export class CampusMentoringComponent {
	constructor (
		private dialog: MatDialog,
    private overlay: Overlay
	) {}

	protected sampleMentorsList = [
		{ name: 'Paul Molive'},
		{ name: 'Anna Mull'},
		{ name: 'Gail Forcewind'},
	];

	protected onBecomeAMentor (): void {
    let dialogConfig = new MatDialogConfig();
		dialogConfig.panelClass = 'become-a-mentor-modal';
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();

		this.dialog.open(BecomeMentorModalComponent, dialogConfig);
	}
}
