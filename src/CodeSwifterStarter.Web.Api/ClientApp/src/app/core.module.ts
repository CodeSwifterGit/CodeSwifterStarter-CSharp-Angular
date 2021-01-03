import { NgModule } from '@angular/core';

import { ErrorDialogService } from './services/common/errordialog.service';
import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { ScopeGuardService } from './services/auth/scope-guard.service';
import { CloneService } from './services/common/clone.service';

@NgModule({
  imports: [],
  declarations: [
  ],
  exports: [],
  providers: [
    AuthService,
    AuthGuardService,
    ScopeGuardService,
    ErrorDialogService,
    CloneService
  ]
})
export class CoreModule {}
