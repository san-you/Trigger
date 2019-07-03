import { TestBed } from '@angular/core/testing';

import { AppJsonService } from './app-json.service';

describe('AppJsonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppJsonService = TestBed.get(AppJsonService);
    expect(service).toBeTruthy();
  });
});
