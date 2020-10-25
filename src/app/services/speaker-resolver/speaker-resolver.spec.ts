import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ISpeaker } from '../speakers/speaker.interface';
import { SpeakersService } from '../speakers/speakers.service';
import { SpeakersServiceStub } from '../speakers/speakers.service.stub';
import { SpeakerResolver } from './speaker-resolver';

describe('SpeakerResolver', () => {
  let service: SpeakerResolver;
  let speaker: ISpeaker;
  let speakerService: SpeakersServiceStub;

  beforeEach(() => {
    speakerService = new SpeakersServiceStub();
    speaker = { name: { first: 'Bob' } } as ISpeaker;

    (speakerService.getSpeaker as jasmine.Spy).and.returnValue(speaker);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: SpeakersService,
          useValue: speakerService
        }
      ]
    });
    service = TestBed.inject(SpeakerResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when resolving the speaker', () => {
    let resolvedSpeaker: ISpeaker;

    beforeEach(() => {
      const paramMap: ParamMap = jasmine.createSpyObj('paramMap', ['get']);

      (paramMap.get as jasmine.Spy).and.returnValue('123');

      resolvedSpeaker = service.resolve({ paramMap } as ActivatedRouteSnapshot);
    });

    it('should retrieve the correct speaker based on the param id', () => {
      expect(speakerService.getSpeaker).toHaveBeenCalledWith('123');
      expect(resolvedSpeaker).toBe(speaker);
    });
  });
});
