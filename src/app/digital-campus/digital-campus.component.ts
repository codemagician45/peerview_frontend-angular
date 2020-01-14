import {
  Component,
  Inject,
  AfterViewInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {Meta} from '@angular/platform-browser';


@Component({
  selector: 'digital-campus-component',
  templateUrl: './digital-campus.component.html',
  styleUrls: ['./digital-campus.component.scss']
})
export class DigitalCampusComponent implements AfterViewInit {
  constructor (
    @Inject(Window) private window: Window,
    private activedRoute: ActivatedRoute, private meta: Meta) {
    this.meta.updateTag({ name: 'description', content: 'Connect the student community within your institution with Peersview.' });

  }

  protected section: string = 'institutions';
  private container;

  public ngAfterViewInit (): void {
    this.activedRoute.fragment.subscribe((fragment: string) => {
      this.container = this.window.document.querySelector(`#${fragment}`);
      if (this.container) {
        setTimeout(() => {
          this.container.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest'});
        }, 1000);
      }
    });
  }
}
