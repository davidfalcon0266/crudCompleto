import { TestBed } from '@angular/core/testing';

import { HeroessService } from './heroess.service';

describe('HeroessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeroessService = TestBed.get(HeroessService);
    expect(service).toBeTruthy();
  });
});
