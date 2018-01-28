import {Directive, ElementRef, Input, HostListener} from '@angular/core';
// import Sticky from 'sticky-js';

@Directive({ selector: '[sticky]' })
export class StickyDirective {
  stuck = false;
  stickPoint: any;
  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    const distance = this.getDistance() - window.pageYOffset;
    const offset = window.pageYOffset;
    // readout.innerHTML = stickPoint + '   ' + distance + '   ' + offset + '   ' + stuck;

    if ( (distance <= 0) && !this.stuck) {
      this.el.nativeElement.style.position = 'fixed';
      this.el.nativeElement.style.top = '0px';
      this.stuck = true;
    } else if (this.stuck && (offset <= this.stickPoint)){
      this.el.nativeElement.style.position = 'static';
      this.stuck = false;
    }
  }

  constructor(private el: ElementRef) {
    // el.nativeElement.style.backgroundColor = 'yellow';
    this.stickPoint = this.getDistance()
  }

  private getDistance() {
    return this.el.nativeElement.offsetTop
  }
}
