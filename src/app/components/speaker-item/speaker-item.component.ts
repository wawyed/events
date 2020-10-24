import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges } from '@angular/core';
import { ISpeaker } from '../../services/speakers/speaker.interface';
import { ISpeakerItemComponent } from './speaker-item.component.interface';

@Component({
  selector: 'app-speaker-item',
  templateUrl: './speaker-item.component.html',
  styleUrls: ['./speaker-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeakerItemComponent implements ISpeakerItemComponent, OnChanges {
  @Input()
  public appSpeakerItemData: ISpeaker;

  @HostBinding('class.is-fullView')
  @Input()
  public appSpeakerItemFull = false;

  public fields: Array<{ label: string, value: string }>;

  public picture: string;

  public ngOnChanges(): void {
    this.fields = [
      {
        label: 'Name',
        value: `${this.appSpeakerItemData.name.first} ${this.appSpeakerItemData.name.last}`
      },
      {
        label: 'Email',
        value: this.appSpeakerItemData.email
      },
      {
        label: 'Name',
        value: this.appSpeakerItemData.phone
      },
    ];

    this.picture = this.appSpeakerItemData.picture.thumbnail;

    if (this.appSpeakerItemFull) {
      this.picture = this.appSpeakerItemData.picture.large;

      this.fields = this.fields.concat([
        {
          label: 'Age',
          value: this.appSpeakerItemData.dob.age.toString()
        },
        {
          label: 'Country',
          value: this.appSpeakerItemData.location.country
        }
      ]);
    }
  }

}
