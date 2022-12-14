import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'table-bootstrap',
  templateUrl: './table-bootstrap.component.html',
  styleUrls: ['./table-bootstrap.component.css']
})
export class TableBootstrapComponent{

  @Input() HeadArray: any[] =[];

  @Input() GridArray!:Observable<any[]>;

  @Output() notifyEdit:EventEmitter<any>=new EventEmitter();
  @Output() notifyDelete:EventEmitter<any>=new EventEmitter();



  onEdit(item:any):void{
    this.notifyEdit.emit(item);
  }

  onDelete(item:any):void{
    this.notifyDelete.emit(item)
  }
}
