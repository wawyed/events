import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpakerItemStubComponent } from '../speaker-item/spaker-item.component.stub';

import { SpeakerDetailComponent } from './speaker-detail.component';

describe('SpeakerDetailComponent', () => {
  let component: SpeakerDetailComponent;
  let fixture: ComponentFixture<SpeakerDetailComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [SpeakerDetailComponent, SpakerItemStubComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
