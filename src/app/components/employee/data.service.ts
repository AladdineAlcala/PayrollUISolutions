import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

private employeeSource=new BehaviorSubject('')
  employee=this.employeeSource.asObservable();

  constructor() { }


}
