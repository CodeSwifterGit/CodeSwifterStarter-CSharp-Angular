import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';

describe('AuthService',
  () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthService
        ],
        imports: [
          RouterTestingModule,
          HttpClientTestingModule
        ]
      });
    });

    it('should be created',
      () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
      });
  });
