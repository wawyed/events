import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SpeakersService } from './speakers.service';

describe('SpeakersService', () => {
  let service: SpeakersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SpeakersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
