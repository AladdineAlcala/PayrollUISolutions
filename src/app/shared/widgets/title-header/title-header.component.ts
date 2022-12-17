import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-header',
  templateUrl: './title-header.component.html',
  styleUrls: ['./title-header.component.css']
})
export class TitleHeaderComponent {

@Input() title_head:string=" "



}
