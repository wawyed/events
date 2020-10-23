import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeakerDetailComponent } from './components/speaker-detail/speaker-detail.component';
import { SpeakersListComponent } from './components/speakers-list/speakers-list.component';
import { CanActivateSpeakerDetail } from './services/can-activate-speaker-detail/can-activate-speaker-detail';
import { SpeakerResolver } from './services/speaker-resolver/speaker-resolver';

const routes: Routes = [
  { path: 'speakers/list', component: SpeakersListComponent },
  {
    path: 'speakers/detail/:id',
    component: SpeakerDetailComponent,
    canActivate: [
      CanActivateSpeakerDetail
    ],
    resolve: { speaker: SpeakerResolver }
  },
  { path: '', redirectTo: 'speakers/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
