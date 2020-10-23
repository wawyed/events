import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ISpeaker } from '../../services/speakers/speaker.interface';
import { SpeakersService } from '../../services/speakers/speakers.service';

@Component({
  selector: 'app-speaker-detail',
  templateUrl: './speaker-detail.component.html',
  styleUrls: ['./speaker-detail.component.scss']
})
export class SpeakerDetailComponent implements OnInit {
  private speakersService: SpeakersService;
  public speaker: ISpeaker;
  private activatedRoute: ActivatedRoute;

  constructor(speakersService: SpeakersService, activatedRoute: ActivatedRoute) {
    this.speakersService = speakersService;
    this.activatedRoute = activatedRoute;
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.speaker = this.speakersService.getSpeaker(params.id);
    });
  }
}
