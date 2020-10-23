import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SpeakersService } from '../speakers/speakers.service';

@Injectable({ providedIn: 'root' })
export class CanActivateSpeakerDetail implements CanActivate {
  private router: Router;
  private speakerService: SpeakersService;

  constructor(router: Router, speakerService: SpeakersService) {
    this.router = router;
    this.speakerService = speakerService;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    return this.speakerService.hasSpeaker(route.params.id) || this.router.parseUrl('speakers/list');
  }
}
