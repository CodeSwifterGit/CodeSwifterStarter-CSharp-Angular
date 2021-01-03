import { TestBed, inject } from '@angular/core/testing';
import { CloneService } from './clone.service';

describe('Service: Clone',
  () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [CloneService]
      });
    });

    it('should create',
      inject([CloneService],
        (service: CloneService) => {
          expect(service).toBeTruthy();
        }));
  });
