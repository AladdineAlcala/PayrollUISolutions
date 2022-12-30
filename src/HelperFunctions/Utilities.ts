

export function ConvertID(id:string):number{

    let newid= id.replace( /^\D+/g, '');
    return parseInt(newid);
    
}