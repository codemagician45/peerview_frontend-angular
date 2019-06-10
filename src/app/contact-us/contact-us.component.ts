import {
  Component,
  OnDestroy
} from '@angular/core';
import {
  ngxZendeskWebwidgetService,
} from 'ngx-zendesk-webwidget';
import {Meta} from '@angular/platform-browser';


@Component({
  selector: 'contact-us-component',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnDestroy {
  constructor(
    private zendeskWebwidgetService: ngxZendeskWebwidgetService, private meta: Meta
  ) {
    zendeskWebwidgetService.identify({
      name: 'Info@peersview.com',
      email: 'Peersview-40'
    });
    this.zendeskWebwidgetService.show();
    this.meta.updateTag({name: 'description', content: 'Have any questions? Let us know how we can help!'});

  }

  public ngOnDestroy(): void {
    this.zendeskWebwidgetService.hide();
  }
}
