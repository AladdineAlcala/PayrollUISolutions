import { exhaustMap } from "rxjs";
import { Employee } from "src/app/models/employee";


export function ConvertID(id:string):number{

    let newid= id.replace( /^\D+/g, '');
    return parseInt(newid);
    
}

export function dateconvert(date:Date):string{
    let d:number=date.getDate();
    let m:number=date.getMonth()+1;
    let y:number=date.getFullYear()
     
    let datestr=`${y}/${m}/${d}`

    return datestr;

   }



  export function getdaynum(date: Date): number {

    if(typeof(date)==='string')
    {
        date=new Date(date)
    }
    return  date.getDate();
  }

  export function tofullname(employee:Employee){
    return `${employee.fname} ${employee.lname}`
  }