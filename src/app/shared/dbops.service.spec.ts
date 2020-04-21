import { TestBed } from '@angular/core/testing';

import { DbopsService } from './dbops.service';

describe('DbopsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbopsService = TestBed.get(DbopsService);
    expect(service).toBeTruthy();
  });
});
