import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[allow-tab]',
  host: {
    '(keydown)': 'onKeyUp($event)'
  }
})
export class AllowTabDirective {
  onKeyUp($event) {
    var el = $event.currentTarget;

    if ($event.keyCode === 9) {
      var val = el.value,
        start = el.selectionStart,
        end = el.selectionEnd;

      el.value = val.substring(0, start) + '\t' + val.substring(end);
      el.selectionStart = el.selectionEnd = start + 1;

      return false;
    }
  }
}