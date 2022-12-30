import { Injectable } from "@angular/core";
import { AttendanceLog, AttendanceLogFetch } from "../models/attendancelog";
import { initialState } from "../models/payrollperiod";
import { BaseStore } from "./abstractstore";

interface AttendanceLogState{
    attlogfetch:AttendanceLogFetch[],
    attendancelog:AttendanceLog[]

}

const loginitialState:AttendanceLogState={
    attlogfetch:[]=[],
    attendancelog:[]=[]

}

@Injectable({ providedIn: 'root' })
export class AttendanceLogsStore extends BaseStore<AttendanceLogState>{

    constructor() {

        super(loginitialState);
        
    }

    
    importLogsfromdevice(logs:AttendanceLogFetch[]){

        this.setState(()=>({attlogfetch:[...logs]}))
    }

    set_attendancelogs(attendancelog:AttendanceLog[]){
        this.setState(()=>({attendancelog:[...attendancelog]}))
    }
}