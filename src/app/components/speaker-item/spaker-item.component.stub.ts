import { Component, Input } from '@angular/core';
import { ISpeaker } from '../../services/speakers/speaker.interface';
import { ISpeakerItemComponent } from './speaker-item.component.interface';

@Component({
  selector: 'app-speaker-item',
  template: ''
})
export class SpakerItemStubComponent implements ISpeakerItemComponent {
  @Input()
  public appSpeakerItemData: ISpeaker;

  @Input()
  public appSpeakerItemFull: boolean;
}
