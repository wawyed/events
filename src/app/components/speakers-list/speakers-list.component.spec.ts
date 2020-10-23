import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { SpeakersService } from '../../services/speakers/speakers.service';
import { SpeakersServiceStub } from '../../services/speakers/speakers.service.stub';

import { SpeakersListComponent } from './speakers-list.component';

describe('SpeakersListComponent', () => {
  let component: SpeakersListComponent;
  let fixture: ComponentFixture<SpeakersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeakersListComponent, FilterPipe ],
      providers: [
        {
          provide: SpeakersService,
          useValue: new SpeakersServiceStub()
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
