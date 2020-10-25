import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpeakersService } from '../speakers/speakers.service';
import { SpeakersServiceStub } from '../speakers/speakers.service.stub';
import { CanActivateSpeakerDetail } from './can-activate-speaker-detail';

describe('CanActivateSpeakerDetail', () => {
  let service: CanActivateSpeakerDetail;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: SpeakersService,
          useValue: new SpeakersServiceStub()
        }
      ]
    });
    service = TestBed.inject(CanActivateSpeakerDetail);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
