import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'app/services/auth/auth.service';


import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService',
  () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          AuthGuardService
        ],
        imports: [
          RouterTestingModule,
          HttpClientTestingModule
        ]
      });
    });

    it('should create',
      inject([AuthGuardService],
        (guard: AuthGuardService) => {
          expect(guard).toBeTruthy();
        }));
  });
