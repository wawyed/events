import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISpeaker } from 'src/app/services/speakers/speaker.interface';
import { SpeakersService } from '../../services/speakers/speakers.service';

@Component({
  selector: 'app-speakers-list',
  templateUrl: './speakers-list.component.html',
  styleUrls: ['./speakers-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeakersListComponent implements OnInit {
  private speakersService: SpeakersService;

  public speakers$: Observable<Array<ISpeaker>>;
  public showMore = true;
  public fetching = false;
  private changeDetectorRef: ChangeDetectorRef;

  constructor(speakersService: SpeakersService, changeDetectorRef: ChangeDetectorRef) {
    this.speakersService = speakersService;
    this.changeDetectorRef = changeDetectorRef;
  }

  ngOnInit(): void {
    this.speakers$ = this.speakersService.getSpeakers();
  }

  public async fetchMore(): Promise<void> {
    this.fetching = true;

    await this.speakersService.getNextPage();

    this.showMore = this.speakersService.hasNextPage();

    this.fetching = false;

    this.changeDetectorRef.markForCheck();
  }
}
