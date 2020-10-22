import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeakersListComponent } from './components/speakers-list/speakers-list.component';
import { SpeakerDetailComponent } from './components/speaker-detail/speaker-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SpeakersListComponent,
    SpeakerDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
