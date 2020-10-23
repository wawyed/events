import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISpeaker } from '../../services/speakers/speaker.interface';

@Component({
  selector: 'app-speaker-detail',
  templateUrl: './speaker-detail.component.html',
  styleUrls: ['./speaker-detail.component.scss']
})
export class SpeakerDetailComponent {
  public speaker: ISpeaker;

  constructor(activatedRoute: ActivatedRoute) {
    this.speaker = activatedRoute.snapshot.data.speaker;
  }
}
