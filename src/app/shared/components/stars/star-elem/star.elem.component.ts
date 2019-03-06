import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  SimpleChanges
} from '@angular/core';
import {
  PostModel
} from '../../../models';

@Component({
  selector: 'star-elem',
  templateUrl: './star.elem.component.html',
})

export class SharedStarElemComponent {
  constructor () {}

  @Input() protected star: string = 'star_border';
  @Output() protected starClick = new EventEmitter();
  @Output() protected mouseEnter = new EventEmitter();
  @Output() protected mouseLeave = new EventEmitter();
  @HostListener('mouseenter') private onMouseEnter (): void {
    this.mouseEnter.emit();
  }
  @HostListener('mouseleave') private onMouseLeave (): void {
    this.mouseLeave.emit();
  }

  protected clickOnStarClick (): void {
    this.starClick.emit();
  }

}
