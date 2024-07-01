import { TestBed } from '@angular/core/testing';

import { RestRequestServiceService } from './rest-request-service.service';

describe('REstRequestServiceService', () => {
  let service: RestRequestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestRequestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
