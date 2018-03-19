import { TestBed, inject } from '@angular/core/testing';

import { InitJsService } from './init-js.service';

describe('InitJsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitJsService]
    });
  });

  it('should be created', inject([InitJsService], (service: InitJsService) => {
    expect(service).toBeTruthy();
  }));
});
