import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'main-container',
  templateUrl: './maincontainer.component.html',
  styleUrls: ['./maincontainer.component.css'],
})
export class MaincontainerComponent {
  @Input() title: string = '';

  @Output() oncontentEventClose = new EventEmitter();

  oncontentClose() {
    this.oncontentEventClose.emit();
  }
}
