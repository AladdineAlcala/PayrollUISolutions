import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, concatMap, finalize, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  message:string="";
  private messageSubject=new BehaviorSubject<string>(this.message)
  private loadingSubject=new BehaviorSubject<boolean>(false);
 
  public readonly loading$:Observable<boolean>=this.loadingSubject.asObservable();

  public readonly message$:Observable<string>=this.messageSubject.asObservable();


  showloaderuntilCompleted<T>(obs$:Observable<T>):Observable<T>{

    return of(null)
        .pipe(
          tap(()=> this.loadingOn()),
          concatMap(()=>obs$),
          finalize(()=> this.loadingOff())
        );
    
  }

  loadingOn(message?:string){
    this.messageSubject.next(message || '')
    this.loadingSubject.next(true);
  }

  loadingOff(){
    this.loadingSubject.next(false);
  }
}
