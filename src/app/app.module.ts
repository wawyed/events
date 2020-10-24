import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeakerDetailComponent } from './components/speaker-detail/speaker-detail.component';
import { SpeakerItemComponent } from './components/speaker-item/speaker-item.component';
import { SpeakersListComponent } from './components/speakers-list/speakers-list.component';
import { FilterPipe } from './pipes/filter.pipe';

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
  providers: [
    {
      provide: 'pageLimit',
      useValue: 20
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
