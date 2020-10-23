import { Component, Input, OnInit } from '@angular/core';
import { ISpeaker } from '../../services/speakers/speaker.interface';

@Component({
  selector: 'app-speaker-item',
  templateUrl: './speaker-item.component.html',
  styleUrls: ['./speaker-item.component.scss']
})
export class SpeakerItemComponent implements OnInit {

  @Input()
  public appSpeakerItemData: ISpeaker;

  @Input()
  public appSpeakerItemFull = false;

  constructor() { }

  ngOnInit(): void {
  }

}
