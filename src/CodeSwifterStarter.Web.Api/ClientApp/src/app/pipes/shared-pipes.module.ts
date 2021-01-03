import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from 'app/pipes/safe-html.pipe';
import { EnvironmentPipe } from 'app/pipes/environment.pipe';

const pipes = [
  SafeHtmlPipe,
  EnvironmentPipe
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: pipes,
  exports: pipes
})
export class SharedPipesModule {}