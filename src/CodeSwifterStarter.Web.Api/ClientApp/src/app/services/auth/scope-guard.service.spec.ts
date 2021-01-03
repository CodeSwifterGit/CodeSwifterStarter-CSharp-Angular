import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'app/services/auth/auth.service';

import { ScopeGuardService } from './scope-guard.service';

describe('ScopeGuardService',
  () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          ScopeGuardService
        ],
        imports: [
          RouterTestingModule,
          HttpClientTestingModule
        ]
      });
    });

    it('should create',
      inject([ScopeGuardService],
        (service: ScopeGuardService) => {
          expect(service).toBeTruthy();
        }));
  });
