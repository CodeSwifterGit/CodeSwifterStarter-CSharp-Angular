import { Directive, Input } from '@angular/core';

@Directive( {
  selector : '[prevent-characters]',
  host : {
      '(keydown)' : 'onKeyUp($event)'
  }
} )
export class PreventCharactersDirective {
  @Input( 'prevent-characters' ) preventCharacters;
  onKeyUp ( $event ) {
      if ( this.preventCharacters && this.preventCharacters.includes(String.fromCharCode($event.keyCode))) {
          $event.preventDefault();
      }
  }
}