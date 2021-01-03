import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontSizeDirective } from './font-size.directive';
import { ScrollToDirective } from './scroll-to.directive';
import { NoCopyPasteDirective } from 'app/directives/no-copy-paste.directive';
import { NoRightClickDirective } from 'app/directives/no-right-click.directive';
import { PreventKeysDirective } from 'app/directives/prevent-keys.directive';
import { PreventCharactersDirective } from 'app/directives/prevent-characters.directive';
import { AllowTabDirective } from 'app/directives/allow-tab.directive';

const directives = [
  FontSizeDirective,
  ScrollToDirective,
  NoRightClickDirective,
  NoCopyPasteDirective,
  PreventKeysDirective,
  PreventCharactersDirective,
  AllowTabDirective
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: directives,
  exports: directives
})
export class SharedDirectivesModule {}