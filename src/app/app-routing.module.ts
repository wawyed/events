import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpeakersListComponent } from './speakers-list/speakers-list.component';

const routes: Routes = [
  { path: '/speakers/list', component: SpeakersListComponent },
  { path: '/speakers/detail', component: SpeakersListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
