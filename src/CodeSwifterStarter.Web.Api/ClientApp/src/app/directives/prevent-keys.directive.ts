import { Directive, Input } from '@angular/core';

@Directive( {
  selector : '[prevent-keys]',
  host : {
      '(keydown)' : 'onKeyUp($event)'
  }
} )
export class PreventKeysDirective {
  @Input( 'prevent-keys' ) preventKeys;
  onKeyUp ( $event ) {
      if ( this.preventKeys && this.preventKeys.includes( $event.keyCode ) ) {
          $event.preventDefault();
      }
  }
}