import { Injectable } from "@angular/core";
import { Employee } from "../models/employee"
import { BaseStore } from "./abstractstore"


interface EmployeeState{
    employees:Employee[]
    
}


const empinitialState:EmployeeState={
    employees:[]
}


@Injectable({ providedIn: 'root' })
export class EmployeeStore extends BaseStore<EmployeeState> {

   
    constructor() {
        super(empinitialState);
        
    }


    initemployeeState(employees:Employee[]){

    this.clearemployeesState();
    
    this.setState(() => ({employees:[...employees]}))
    }

    clearemployeesState(){
    this.setState(()=> ({employees:[]}))
    }




}