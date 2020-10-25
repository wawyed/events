import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ISpeaker } from '../speakers/speaker.interface';
import { SpeakersService } from '../speakers/speakers.service';

@Injectable({ providedIn: 'root' })
export class SpeakerResolver implements Resolve<ISpeaker> {
  private speakersService: SpeakersService;

  constructor(speakersService: SpeakersService) {
    this.speakersService = speakersService;
  }

  resolve(
    route: ActivatedRouteSnapshot
  ): ISpeaker {
    return this.speakersService.getSpeaker(route.paramMap.get('id'));
  }
}
