import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ISpeaker } from 'src/app/services/speakers/speaker.interface';
import { SpeakersService } from '../../services/speakers/speakers.service';

@Component({
  selector: 'app-speakers-list',
  templateUrl: './speakers-list.component.html',
  styleUrls: ['./speakers-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeakersListComponent implements OnInit {
  public speakers$: Observable<Array<ISpeaker>>;
  public showMore = true;
  public fetching = true;
  public searchValue = '';
  private speakersService: SpeakersService;

  constructor(speakersService: SpeakersService) {
    this.speakersService = speakersService;
  }

  public ngOnInit(): void {
    this.speakers$ = this.speakersService.getSpeakers().pipe(tap(() => {
      this.fetching = false;
      this.showMore = this.speakersService.hasNextPage();
    }));
  }

  public fetchMore(): void {
    this.fetching = true;

    this.speakersService.getNextPage();
  }

  public filterBy(searchValue: string, value: ISpeaker): boolean {
    if (!searchValue) {
      return true;
    }

    searchValue = searchValue.toLowerCase();

    return value.name.first.toLowerCase().includes(searchValue) || value.name.last.toLowerCase().includes(searchValue);
  }

  public trackByFn(index: number, speaker: ISpeaker): string {
    return speaker.login.uuid;
  }
}
