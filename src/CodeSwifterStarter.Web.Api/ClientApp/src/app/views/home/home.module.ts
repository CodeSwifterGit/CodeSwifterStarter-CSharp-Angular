import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedComponentsModule } from 'app/views/shared/shared-components.module';
import { HomeRoutingModule } from 'app/views/home/home-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    HomeRoutingModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class HomeModule { }
