

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