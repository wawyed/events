import { Observable } from 'rxjs';
import { ISpeaker } from './speaker.interface';

export interface ISpeakersService {
  hasNextPage(): boolean;
  getNextPage(): void;
  getSpeakers(): Observable<Array<ISpeaker>>;
  getSpeaker(id: string): ISpeaker;
  hasSpeaker(id: string): boolean;
}
