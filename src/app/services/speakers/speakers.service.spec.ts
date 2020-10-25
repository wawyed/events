import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ISpeaker } from './speaker.interface';
import { ISpeakersApiResponse, SpeakersService } from './speakers.service';

describe('SpeakersService', () => {
  let service: SpeakersService;
  let httpController: HttpTestingController;
  const page1Response: ISpeakersApiResponse = {
    info: { page: 1, results: 2 },
    results: [
      {
        login: { uuid: '1' }
      } as ISpeaker,
      {
        login: { uuid: '2' }
      } as ISpeaker
    ]
  };
  const page2Response: ISpeakersApiResponse = {
    info: { page: 2, results: 1 },
    results: [
      {
        login: { uuid: '3' }
      } as ISpeaker
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: 'pageLimit',
          useValue: 2
        }
      ]
    });
    service = TestBed.inject(SpeakersService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return that there is a next page', () => {
    expect(service.hasNextPage()).toBe(true);
  });

  describe('when getting the list of speakers', () => {
    let result: Array<ISpeaker>;

    beforeEach(() => {
      result = null;
      service.getSpeakers().subscribe((speakers: Array<ISpeaker>) => {
        result = speakers;
      });
    });

    it('should make a request to the API with the correct page', () => {
      expect(() => httpController.expectOne('https://randomuser.me/api/?page=1&results=2')).not.toThrow();
    });

    describe('when requesting the next page', () => {
      beforeEach(() => {
        service.getNextPage();
      });

      it('should not make a new request', () => {
        expect(() => httpController.expectOne('https://randomuser.me/api/?page=1&results=2')).not.toThrow();
      });
    });

    describe('when the response returns', () => {
      beforeEach(() => {
        httpController.expectOne('https://randomuser.me/api/?page=1&results=2').flush(page1Response);
      });

      it('should emit the list of speakers', () => {
        expect(result).toEqual(page1Response.results);
      });

      describe('when requesting the next page', () => {
        beforeEach(() => {
          service.getNextPage();
        });

        it('should make a request to the API with the next page', () => {
          expect(() => httpController.expectOne('https://randomuser.me/api/?page=2&results=2')).not.toThrow();
        });

        describe('when the response returns with less items than the page size', () => {
          beforeEach(() => {
            httpController.expectOne('https://randomuser.me/api/?page=2&results=2').flush(page2Response);
          });

          it('should emit the updated list of speakers', () => {
            expect(result).toEqual([...page1Response.results, ...page2Response.results]);
          });

          it('should return that there is no more pages', () => {
            expect(service.hasNextPage()).toBe(false);
          });

          it('should allow to return a specific speaker', () => {
            expect(service.getSpeaker('2')).toBe(page1Response.results[1]);
            expect(service.getSpeaker('4')).toBe(undefined);
          });

          it('should allow to query if a specific speaker exist', () => {
            expect(service.hasSpeaker('2')).toBe(true);
            expect(service.hasSpeaker('4')).toBe(false);
          });
        });
      });
    });
  });
});
