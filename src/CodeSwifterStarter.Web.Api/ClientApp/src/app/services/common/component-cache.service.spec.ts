import { TestBed } from '@angular/core/testing';

import { ComponentCacheService } from './component-cache.service';

describe('ComponentCacheService', () => {
  let service: ComponentCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
