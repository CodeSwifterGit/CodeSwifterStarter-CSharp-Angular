import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'app/services/auth/auth.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard',
  () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          AuthGuard
        ],
        imports: [
          RouterTestingModule,
          HttpClientTestingModule
        ]
      });
    });

    it('should create',
      inject([AuthGuard],
        (service: AuthGuard) => {
          expect(service).toBeTruthy();
        }));
  });
