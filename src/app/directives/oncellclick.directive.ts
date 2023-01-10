import { Directive, HostListener, Input } from "@angular/core";
import { Subject } from "rxjs";



@Directive({
    selector:'[cellclick]'
})
export class TableCellClickEventDirective{

    @Input() data!:unknown;

    @HostListener('click',['$event'])
    onclick(){

      console.log(this.data);
    }

}