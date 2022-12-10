import { DatePipe } from '@angular/common';
import { Type } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dynamictransform'
})
export class DynamictransformPipe implements PipeTransform {

  transform(value: any, args?:any): any {

      switch(args||null){

        case 'string' :

          return value.toUpperCase();

        case 'date' :
          var datePipe = new DatePipe("en-US");
          value = datePipe.transform(value, 'MM-dd-yyyy');
  
          return value;

        case 'number' :
          return parseInt(value);

        default:

          return value;
      }

    return value;
  }


}
