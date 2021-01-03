import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[autoFocus]'
})
export class AutofocusDirective implements AfterContentInit {

    @Input() public autoFocus: boolean;

    public constructor(private el: ElementRef) {

    }

    public ngAfterContentInit() {

        setTimeout(() => {

            this.el.nativeElement.focus();

        }, 500);

    }

}