/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IndustryService } from './industry.service';

describe('Service: Industry', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndustryService]
    });
  });

  it('should ...', inject([IndustryService], (service: IndustryService) => {
    expect(service).toBeTruthy();
  }));
});
