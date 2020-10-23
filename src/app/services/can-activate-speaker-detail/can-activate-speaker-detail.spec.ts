import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CanActivateSpeakerDetail } from './can-activate-speaker-detail';

describe('CanActivateSpeakerDetail', () => {
  let service: CanActivateSpeakerDetail;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ]
    });
    service = TestBed.inject(CanActivateSpeakerDetail);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
