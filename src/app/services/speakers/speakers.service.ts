import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { concatMap, distinctUntilChanged, map, shareReplay, startWith, tap } from 'rxjs/operators';
import { ISpeaker } from './speaker.interface';
import { ISpeakersService } from './speakers.service.interface';

export interface ISpeakersApiResponse {
  info: { page: number, results: number };
  results: Array<ISpeaker>;
}

@Injectable({
  providedIn: 'root'
})
export class SpeakersService implements ISpeakersService {
  private readonly httpClient: HttpClient;
  private readonly speakersUrl = 'https://randomuser.me/api/';
  private readonly speakers$: Observable<Array<ISpeaker>>;
  private readonly pageSize;
  private readonly fetchPageSubject: Subject<number> = new Subject();

  private currentSpeakers: Array<ISpeaker> = [];
  private currentPage = 1;
  private nextPage = true;


  constructor(httpClient: HttpClient, @Inject('pageLimit') pageSize: number) {
    this.pageSize = pageSize;
    this.httpClient = httpClient;

    this.speakers$ = this.fetchPageSubject.pipe(
      startWith(this.currentPage),
      distinctUntilChanged(),
      concatMap(() => {
        return this.httpClient.get<ISpeakersApiResponse>(
          this.speakersUrl,
          { params: { page: this.currentPage.toString(), results: this.pageSize.toString() } }
        ).pipe(
          tap((response: ISpeakersApiResponse) => {
            // The only way I thought to be able to determine if there is more
            // results is by checking if the result length is different than requested with the current API implementation
            this.nextPage = response.results.length === this.pageSize;
            this.currentPage++;
          }),
          map((response: ISpeakersApiResponse) => {
            this.currentSpeakers = this.currentSpeakers.concat(response.results);

            return this.currentSpeakers;
          })
        );
      }),
      shareReplay(1)
    );
  }

  public hasNextPage(): boolean {
    return this.nextPage;
  }

  public getNextPage(): void {
    this.fetchPageSubject.next(this.currentPage);
  }

  public getSpeakers(): Observable<Array<ISpeaker>> {
    return this.speakers$;
  }

  public getSpeaker(id: string): ISpeaker {
    return this.currentSpeakers.find((speaker: ISpeaker) => {
      return speaker.login.uuid === id;
    });
  }

  public hasSpeaker(id: string): boolean {
    return !!this.getSpeaker(id);
  }
}
