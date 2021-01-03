import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNoRightClick]'
})
export class NoRightClickDirective {

  @Input() appNoRightClick: boolean;

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
      if (!!this.appNoRightClick)
        event.preventDefault();
  }

  constructor() { }

}