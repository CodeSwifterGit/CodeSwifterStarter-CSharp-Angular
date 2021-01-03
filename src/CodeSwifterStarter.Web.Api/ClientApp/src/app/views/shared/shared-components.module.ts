import { NgModule } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { ConfirmationDialogComponent } from 'app/views/shared/confirmation-dialog/confirmation-dialog.component';
import { ToastMessageComponent } from 'app/views/shared/toast-message/toast-message.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from 'app/shared.module';
import { SharedDirectivesModule } from 'app/directives/shared-directives.module';
import { SharedPipesModule } from 'app/pipes/shared-pipes.module';
import { AppLoaderComponent } from 'app/services/app-loader/app-loader.component';

const components = [
  AppLoaderComponent,
  ConfirmationDialogComponent,
  ToastMessageComponent
];

@NgModule({
  imports: [
    SharedModule,
    SharedDirectivesModule,
    SharedPipesModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    NgScrollbarModule
  ],
  declarations: components,
  providers: [],
  exports: [
    components,
    NgScrollbarModule,
    SharedDirectivesModule,
    SharedPipesModule
  ]
})
export class SharedComponentsModule {
}