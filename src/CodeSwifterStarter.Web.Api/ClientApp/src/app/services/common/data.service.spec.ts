/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ApiUrlService } from 'app/services/common/api-url.service';
import { DataService } from './data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Data',
  () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ApiUrlService,
          DataService
        ],
        imports: [
          HttpClientTestingModule
        ]
      });
    });

    it('should create',
      inject([DataService],
        (service: DataService) => {
          expect(service).toBeTruthy();
        }));
  });
