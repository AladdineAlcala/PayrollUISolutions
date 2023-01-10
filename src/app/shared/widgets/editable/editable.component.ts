import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, fromEvent, Observable, Subject, Subscription, switchMap, switchMapTo, take } from 'rxjs';
import { EditModeDirective } from 'src/app/directives/editmode.directive';
import { ViewModeDirective } from 'src/app/directives/viewmode.directive';

@UntilDestroy()
@Component({
  selector: 'editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.css']
})
export class EditableComponent implements OnInit {

  editMode = new Subject();
  editMode$ = this.editMode.asObservable();

  @Input() viewFlag!:BehaviorSubject<boolean>;

  subj$1=new Subscription();
  subj$2=new Subscription();


  constructor(private host:ElementRef) {


  }


  @Output() update = new EventEmitter();

  @ContentChild(ViewModeDirective) viewModeTpl!: ViewModeDirective;
  @ContentChild(EditModeDirective) editModeTpl!: EditModeDirective;
  
  mode:'view'|'edit'='view'

  get currentView(){
    return this.mode==='view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl
  }

  private get element(){
    
    return this.host.nativeElement;
  }


  ngOnInit(): void {

  this.viewFlag.asObservable().subscribe(val => {

   // console.log(`value of viewflag ${val}`);

    this.subj$1 && this.subj$1.unsubscribe();
    this.subj$2 && this.subj$2.unsubscribe();

    if(val===false){
      
      this.viewModeHandler();
      this.editModeHandler();
    }

  })


  }

  private viewModeHandler(){

  //console.log(`value of viewflag ${this.viewFlag.getValue()}`);

   this.subj$1=fromEvent(this.element,'dblclick').pipe(
    untilDestroyed(this)
    ).subscribe(() => {
      console.log('test dblclick');
      this.mode='edit';
      this.editMode.next(true)
    })
  }


  private editModeHandler(){

    const clickOutside$=fromEvent(document,'click').pipe(
      
      filter(({target})=> this.element.contains(target)===false),take(1)
      );
    
   this.subj$2=this.editMode$.pipe(
      filter(Boolean),
      switchMapTo(clickOutside$),
      untilDestroyed(this))
      .subscribe(()=>{

        console.log('test click');

        this.update.emit();
        this.editMode.next(false);
        this.mode='view';

      })

  }




}




