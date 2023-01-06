



export interface LogsView{
    em_Id?:string
    fullname?:string,
    position?:string,
    logdate:Date,
    logtimeINAM?:string
    logtimeOUTAM?:string
    logtimeINPM?:string
    logtimeOUTPM?:string
    late?:number

    pp_id:number


}


export interface EmpLogView {
    empId: string;
    fullname: string;
    position: string;
  }