import {
  Directive,
  Renderer2,
  HostListener,
  HostBinding,
  ElementRef,
  Inject,
  Input
} from '@angular/core';
import {
  timer
} from 'rxjs';

@Directive({
  selector: '[slideToggle]'
})
export class SharedSlideToggleDirectiveComponent {
  constructor (
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(Window) private window: Window) {
  }

  @Input() protected class;

  @HostListener('click', ['$event'])
  private onClick (): void {
    let element = this.window.document.querySelector(`.${this.class}`);
    this.renderer.setStyle(element, 'animation-duration', '.3s');
    if (!element.classList.contains('toggled')) {
      this.renderer.removeClass(element, 'slideUp');
      this.renderer.addClass(element, 'toggled');
      this.el.nativeElement.innerHTML = 'remove';
    } else {
      this.renderer.removeClass(element, 'toggled');
      this.renderer.addClass(element, 'slideUp');
      this.el.nativeElement.innerHTML = 'add';
    }

    timer(300)
    .subscribe(() => {
      this.renderer.setStyle(element, 'animation-duration', '0s');
    });
  }
}
