import {
	Component
} from '@angular/core';
import {
	ActivatedRoute,
	Params
} from '@angular/router';
import {
	CampusApiService
} from '../../../../../services/api';
import {
  CampusMarketplaceModel
} from '../../../../shared/models';
import {
	CryptoUtilities
} from '../../../../shared/utilities';

@Component({
  selector: 'campus-marketplace-item-details-component',
  templateUrl: './marketplace-item-details.component.html',
  styleUrls: ['./marketplace-item-details.component.scss']
})
export class CampusMarketPlaceItemDetails {
	constructor (
		private campusApiService: CampusApiService,
    private route: ActivatedRoute,
	) {}

	protected itemId: number;
	protected myCampusMarketPlaceItem: CampusMarketplaceModel;

	public ngOnInit (): void {
		this.route.parent.parent.params.subscribe((params: Params) => {
			this.itemId = params.id;
			this.getItemDetails();
    });
	}

	private getItemDetails (): void {
		let itemId = parseInt(CryptoUtilities.decipher(this.itemId), 10);
		this.campusApiService.promiseGetMarketplaceItem(itemId)
		.then((campusMarketPlaceItem: CampusMarketplaceModel) => {
			this.myCampusMarketPlaceItem = campusMarketPlaceItem;
			console.log(this.myCampusMarketPlaceItem);
		});
	}
}
