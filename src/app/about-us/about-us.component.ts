import {
  Component
} from '@angular/core';
import {Meta} from '@angular/platform-browser';


@Component({
  selector: 'about-us-component',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
<<<<<<< HEAD
  constructor (private meta: Meta ) {
    this.meta.updateTag({
      name: 'description',
      content: 'We aim to empower university students ' +
      'by connecting them with peers that ' +
      'add value to their learning experience.' });
=======
  constructor (private meta: Meta) {
    this.meta.updateTag({
      name: 'description',
      content: 'We aim to empower university students by connecting them with peers that add value to their learning experience.'
    });
>>>>>>> 6e43c8b783b40420e3e3b792baeae50dbe2b389c
  }
}
