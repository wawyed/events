import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeakersListComponent } from './components/speakers-list/speakers-list.component';
import { SpeakerDetailComponent } from './components/speaker-detail/speaker-detail.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SpeakerItemComponent } from './components/speaker-item/speaker-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SpeakersListComponent,
    SpeakerDetailComponent,
    FilterPipe,
    SpeakerItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
