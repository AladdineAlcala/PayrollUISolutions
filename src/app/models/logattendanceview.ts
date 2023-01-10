



export interface LogsView{

    indexNo:number,
    em_Id:string,
    logdate:Date,
    logtimeINAM?:string 
    logtimeOUTAM?:string
    logtimeINPM?:string
    logtimeOUTPM?:string
    late?:number

    pp_id:number
    //is_editmode?:boolean


}

/* 
export type logTimeType={
    id?:number,
    logtime?:string
} */



export interface EmpLogView {
    empId: string;
    fullname?: string;
    position?: string;
  }