import { TestBed } from '@angular/core/testing';

import { SettingJsonService } from './setting-json.service';

describe('SettingJsonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingJsonService = TestBed.get(SettingJsonService);
    expect(service).toBeTruthy();
  });
});
