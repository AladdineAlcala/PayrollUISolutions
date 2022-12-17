import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";


@Injectable({ providedIn:'root'})
export class NotificationMessageService{

    private success_subject=new Subject<string>();
    successmesssage$=this.success_subject.asObservable();



    private error_subject:BehaviorSubject<string>;
    errormessage$:Observable<string>



    set_successMessage(_message:string){
        this.success_subject.next(_message)
    }

    set_errorMessage(_message:string){
        this.error_subject.next(_message)
    }



    constructor() {
       
        this.error_subject=new BehaviorSubject<string>('');
       this.errormessage$ =this.error_subject.asObservable();
    }
}