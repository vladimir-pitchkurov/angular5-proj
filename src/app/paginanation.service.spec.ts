import { TestBed, inject } from '@angular/core/testing';

import { PaginanationService } from './paginanation.service';

describe('PaginanationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginanationService]
    });
  });

  it('should be created', inject([PaginanationService], (service: PaginanationService) => {
    expect(service).toBeTruthy();
  }));
});
