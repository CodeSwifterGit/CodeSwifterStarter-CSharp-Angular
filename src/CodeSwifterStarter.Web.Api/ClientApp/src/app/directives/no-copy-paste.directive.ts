import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNoCopyPaste]'
})
export class NoCopyPasteDirective {

  @Input() appNoCopyPaste: boolean;

  @HostListener('cut copy', ['$event'])
  onRightClick(event) {
    if (!!this.appNoCopyPaste)
      event.preventDefault();
  }

  constructor() { }

}