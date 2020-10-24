import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { ISpeaker } from '../../services/speakers/speaker.interface';
import { SpeakersService } from '../../services/speakers/speakers.service';
import { SpeakersServiceStub } from '../../services/speakers/speakers.service.stub';
import { SpakerItemStubComponent } from '../speaker-item/spaker-item.component.stub';

import { SpeakersListComponent } from './speakers-list.component';

function getMoreButton(fixture: ComponentFixture<SpeakersListComponent>): DebugElement {
  return fixture.debugElement.query(By.css('.SpeakersList-more'));
}

describe('SpeakersListComponent', () => {
  let component: SpeakersListComponent;
  let fixture: ComponentFixture<SpeakersListComponent>;
  let speakersService: SpeakersServiceStub;
  let speakersBehaviorSubject: BehaviorSubject<Array<ISpeaker>>;
  const speakers: Array<ISpeaker> = [
    {
      name: {
        first: 'Bob',
        last: 'Mathew'
      },
      login: { uuid: '1' }
    } as ISpeaker,
    {
      name: {
        first: 'Mark',
        last: 'Math'
      },
      login: { uuid: '2' }
    } as ISpeaker
  ];

  beforeEach(async() => {
    speakersService = new SpeakersServiceStub();

    speakersBehaviorSubject = new BehaviorSubject(speakers);

    (speakersService.hasNextPage as jasmine.Spy).and.returnValue(true);
    (speakersService.getSpeakers as jasmine.Spy).and.returnValue(speakersBehaviorSubject);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [SpeakersListComponent, FilterPipe, SpakerItemStubComponent],
      providers: [
        {
          provide: SpeakersService,
          useValue: speakersService
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

  it('should display the list of speakers', () => {
    const speakerItems: Array<DebugElement> = fixture.debugElement.queryAll(By.directive(SpakerItemStubComponent));

    expect(speakerItems[0].componentInstance.appSpeakerItemData).toBe(speakers[0]);
    expect(speakerItems[1].componentInstance.appSpeakerItemData).toBe(speakers[1]);
    expect(speakerItems.length).toBe(2);
  });

  it('should display a button to get more speakers', () => {
    expect(getMoreButton(fixture).nativeElement.innerText).toBe('More');
  });

  describe('when the user wants to retrieve more speakers', () => {
    beforeEach(() => {
      getMoreButton(fixture).triggerEventHandler('click', null);
      fixture.detectChanges();
    });

    it('should fetch another page', () => {
      expect(speakersService.getNextPage).toHaveBeenCalled();
    });

    it('should disable the more button whilst fetching', () => {
      expect(getMoreButton(fixture).properties.disabled).toBe(true);
    });

    describe('when the next page results appear', () => {
      const nextPage: Array<ISpeaker> = [
        {
          name: {
            first: 'Tom',
            last: 'Asfield'
          },
          login: { uuid: '3' }
        } as ISpeaker
      ];

      beforeEach(() => {
        speakersBehaviorSubject.next(speakers.concat(nextPage));

        fixture.detectChanges();
      });

      it('should enable the more button', () => {
        expect(getMoreButton(fixture).properties.disabled).toBe(false);
      });

      describe('when the user filters the list based on first name', () => {
        beforeEach(() => {
          const searchInput: DebugElement = fixture.debugElement.query(By.css('input'));

          searchInput.nativeElement.value = 'Tom';
          searchInput.nativeElement.dispatchEvent(new Event('input'));

          fixture.detectChanges();
        });

        it('should filter the list of speakers', () => {
          const speakerItems: Array<DebugElement> = fixture.debugElement.queryAll(By.directive(SpakerItemStubComponent));

          expect(speakerItems[0].componentInstance.appSpeakerItemData).toBe(nextPage[0]);
          expect(speakerItems.length).toBe(1);
        });
      });

      describe('when the user filters the list based on last name', () => {
        beforeEach(() => {
          const searchInput: DebugElement = fixture.debugElement.query(By.css('input'));

          searchInput.nativeElement.value = 'Math';
          searchInput.nativeElement.dispatchEvent(new Event('input'));

          fixture.detectChanges();
        });

        it('should filter the list of speakers', () => {
          const speakerItems: Array<DebugElement> = fixture.debugElement.queryAll(By.directive(SpakerItemStubComponent));

          expect(speakerItems[0].componentInstance.appSpeakerItemData).toBe(speakers[0]);
          expect(speakerItems[1].componentInstance.appSpeakerItemData).toBe(speakers[1]);
          expect(speakerItems.length).toBe(2);
        });
      });
    });

    describe('when the next page results appear and it is the last page', () => {
      beforeEach(() => {
        (speakersService.hasNextPage as jasmine.Spy).and.returnValue(false);
        speakersBehaviorSubject.next(speakers.concat([
          {
            name: {
              first: 'Tom',
              last: 'Asfield'
            },
            login: { uuid: '3' }
          } as ISpeaker
        ]));

        fixture.detectChanges();
      });

      it('should hide the more button', () => {
        expect(getMoreButton(fixture)).toBeNull();
      });
    });
  });
});
