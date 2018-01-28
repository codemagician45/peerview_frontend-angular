import {Directive, ElementRef, Input, HostListener, AfterViewInit} from '@angular/core';
// import Sticky from 'sticky-js';

@Directive({ selector: '[stickyWidget]' })
export class StickyWidgetDirective implements AfterViewInit {
  stuck = false;
  fullHeight: any;
  stickPoint: any;
  offsetTop = 0;
  width;
  height = 0;
  pageYOffset = 0;
  navBarHeight = 66;

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (window.innerWidth < 768) {
      return
    }
    const offset = window.pageYOffset + window.innerHeight;

    const fullHeight = this.getFullHeight();

    if (this.width === undefined) {
        this.width = this.getWidth();
    }

    if (fullHeight > window.innerHeight) {

      if ( (offset > fullHeight) && !this.stuck) {
        this.el.nativeElement.style.position = 'fixed';
        this.el.nativeElement.style.bottom = '0px';
        this.el.nativeElement.style.width = `${this.width}px`;
        this.stuck = true;
      } else if (this.stuck && (offset <= fullHeight)){
        this.el.nativeElement.style.position = 'static';
        this.stuck = false;
      }

    } else {
      if ( (window.pageYOffset > this.offsetTop - this.navBarHeight) && !this.stuck) {
        this.el.nativeElement.style.position = 'fixed';
        this.el.nativeElement.style.top = this.navBarHeight + 'px';
        this.el.nativeElement.style.width = `${this.width}px`;
        this.stuck = true;
      } else if (this.stuck && (window.pageYOffset <= this.offsetTop - this.navBarHeight)){
        this.el.nativeElement.style.position = 'static';
        this.stuck = false;
      }
    }



  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.el.nativeElement.style.width = '';
    this.width = this.getWidth();

  }

  constructor(private el: ElementRef) {

  }

  ngAfterViewInit() {
    const box = this.el.nativeElement.getBoundingClientRect();
    this.height = box.height;
    this.width = box.width;
    this.offsetTop = box.top;
    // console.log('box - ', box)
    this.fullHeight = this.height + this.offsetTop + window.pageYOffset;
    this.pageYOffset =  window.pageYOffset;
  }

  getFullHeight() {
    const box = this.el.nativeElement.getBoundingClientRect();
    return box.height + this.offsetTop + this.pageYOffset;
  }
  getWidth(){
    const box = this.el.nativeElement.getBoundingClientRect();
    return box.width;
  }
}
