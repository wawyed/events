import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { concatMap, first, map, startWith, switchMap, tap } from 'rxjs/operators';
import { ISpeaker } from './speaker.interface';

interface ISpeakersApiResponse {
  info: { page: number, results: number };
  results: Array<ISpeaker>;
}

@Injectable({
  providedIn: 'root'
})
export class SpeakersService {
  private readonly httpClient: HttpClient;
  private readonly speakersUrl = 'https://randomuser.me/api/';
  private readonly speakers$: Observable<Array<ISpeaker>>;
  private readonly pageSize = 20;
  private readonly speakersSubject: Subject<number> = new Subject();

  private currentSpeakers: Array<ISpeaker> = [];
  private currentPage = 1;
  private nextPage = true;


  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;

    this.speakers$ = this.speakersSubject.pipe(
      startWith(this.currentPage),
      concatMap(() => {
        return this.httpClient.get<ISpeakersApiResponse>(
          this.speakersUrl,
          { params: { page: this.currentPage.toString(), results: this.pageSize.toString() } }
        ).pipe(
          tap((response: ISpeakersApiResponse) => {
            this.nextPage = response.info.results === this.pageSize;
          }),
          map((response: ISpeakersApiResponse) => {
          this.currentSpeakers = this.currentSpeakers.concat(response.results);

          return this.currentSpeakers;
        }));
      })
    );
  }

  public hasNextPage(): boolean {
    return this.nextPage;
  }

  public async getNextPage(): Promise<void> {
    this.currentPage++;

    this.speakersSubject.next(this.currentPage);

    await this.speakers$.pipe(first()).toPromise();
  }

  public getSpeakers(): Observable<Array<ISpeaker>> {
    return this.speakers$;
  }
}
