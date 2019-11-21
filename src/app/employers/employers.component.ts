import {
  Component
} from '@angular/core';
import {Meta} from '@angular/platform-browser';


@Component({
  selector: 'employers-component',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.scss']
})
export class EmployersComponent {
  constructor (private meta: Meta) {
    this.meta.updateTag({
      name: 'description',
      content: 'We aim to empower university students by connecting them with peers that add value to their learning experience.'
    });
  }
}
