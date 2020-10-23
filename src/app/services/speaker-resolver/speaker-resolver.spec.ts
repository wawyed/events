import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpeakerResolver } from './speaker-resolver';

describe('SpeakerResolver', () => {
  let service: SpeakerResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ]
    });
    service = TestBed.inject(SpeakerResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
