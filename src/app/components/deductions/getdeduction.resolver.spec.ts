import { TestBed } from '@angular/core/testing';

import { GetdeductionResolver } from './getdeduction.resolver';

describe('GetdeductionResolver', () => {
  let resolver: GetdeductionResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetdeductionResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
