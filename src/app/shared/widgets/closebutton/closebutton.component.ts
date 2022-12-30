import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'main-closebutton',
  templateUrl: './closebutton.component.html',
  styleUrls: ['./closebutton.component.css'],
})
export class ClosebuttonComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

@Output() closebuttonClick =new EventEmitter()

  onClose(){
    this.closebuttonClick.emit()
  }
}
