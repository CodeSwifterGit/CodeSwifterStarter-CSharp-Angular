import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

// SERVICES
import { AppLoaderService } from 'app/services/app-loader/app-loader.service';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  FlexLayoutModule
];

@NgModule({
  imports: modules,
  providers: [
    AppLoaderService,
  ],
  exports: modules
})
export class SharedModule { }
