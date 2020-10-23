import { Observable } from 'rxjs';
import { ISpeaker } from './speaker.interface';
import { ISpeakersService } from './speakers.service.interface';

export class SpeakersServiceStub implements ISpeakersService {
  public getNextPage: () => void = jasmine.createSpy('SpeakersServiceStub.getNextPage');

  public getSpeaker: (id: string) => ISpeaker = jasmine.createSpy('SpeakersServiceStub.getSpeaker');

  public getSpeakers: () => Observable<Array<ISpeaker>>  = jasmine.createSpy('SpeakersServiceStub.getSpeakers');

  public hasNextPage: () => boolean  = jasmine.createSpy('SpeakersServiceStub.hasNextPage');

  public hasSpeaker: (id: string) => boolean  = jasmine.createSpy('SpeakersServiceStub.hasSpeaker');
}
