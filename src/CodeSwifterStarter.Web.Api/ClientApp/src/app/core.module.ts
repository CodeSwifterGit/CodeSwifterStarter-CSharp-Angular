import { NgModule } from '@angular/core';

import { ErrorDialogService } from './services/common/errordialog.service';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth.guard';
import { CloneService } from './services/common/clone.service';

@NgModule({
  imports: [],
  declarations: [
  ],
  exports: [],
  providers: [
    AuthService,
    AuthGuard,
    ErrorDialogService,
    CloneService
  ]
})
export class CoreModule {}
