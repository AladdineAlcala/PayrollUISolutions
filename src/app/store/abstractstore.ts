import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, map, Observable } from "rxjs";

@Injectable({providedIn:'root'})
export abstract class BaseStore<T>{

    private _state:BehaviorSubject<T>;


    constructor(@Inject('') initialState:T) {

        this. _state=new BehaviorSubject<T>(initialState);
        
    }

    get state():T{
        return this._state.getValue();
    }


    get state$():Observable<T>{
        return this._state.asObservable()
    }

  /*   protected setState(nextState:T):void{
        this._state.next(nextState);
    }
 */

    protected setState<K extends keyof T,E extends Partial<Pick<T,K>>>(
      fn:(state :T) => E
    ):void{
        const state=fn(this.state);
        this._state.next({...this.state,...state});
    }

    select<K>(selector: (state: T) => K): Observable<K> {
        return this.state$.pipe(map(selector), distinctUntilChanged());
      }

}