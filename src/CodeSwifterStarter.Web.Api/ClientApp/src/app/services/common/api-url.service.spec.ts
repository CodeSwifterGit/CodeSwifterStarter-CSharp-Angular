import { TestBed, inject } from '@angular/core/testing';
import { ApiUrlService } from './api-url.service';

describe('Service: ApiUrl',
  () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ApiUrlService]
      });
    });

    it('should create',
      inject([ApiUrlService],
        (service: ApiUrlService) => {
          expect(service).toBeTruthy();
        }));
  });
