import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, shareReplay, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { dateconvert } from 'src/HelperFunctions/Utilities';
import { AttendanceLogFetch } from '../models/attendancelog';
import { ResponseDTO } from '../models/ResponseDTO';

@Injectable({
  providedIn: 'root',
})
export class AttendanceLogService {
  url: string = '';

  constructor(private http: HttpClient) {}



  /**------------------------------------------------------------------------------------------------------------------------------------------ */
  //call to device attendance log
  //https://localhost:7066/api/timelog?DtStart=2022-12-15&DtEnd=2022-12-31
  getlogs(dateStart: Date, dateEnd: Date) {

    this.url = 'timelog';
  
    let params = new HttpParams();
    params = params.append('DtStart',dateconvert(dateStart));
    params = params.append('DtEnd',dateconvert(dateEnd));

   //console.log(`${dateconvert(dateStart)} ${dateconvert(dateEnd)}`)

    return this.http
      .get<AttendanceLogFetch[]>(`${environment.base_api_DeviceUrl}/${this.url}/`, {
        params,
      })
      .pipe(delay(2000), map(data=>data),
      catchError(this.handleError)
      );
  }

  //-----------------------------------------------------------------------------------------------------------------------------------
  /** Save logs to database call api */

  postlogs(data:unknown){
    this.url="attlogs"

    const body = JSON.stringify(data);
    const headers = new HttpHeaders()
    .set('Content-type', 'application/json');
    
    return this.http.post<ResponseDTO>(`${environment.base_apiUrl}/${this.url}`,body,{headers:headers})
    .pipe(map(data=>data),
    catchError(this.handleError)
    );
  }




  //-----------------------------------------------------------------------------------------------------------------------------------

  /** Error Handling ----------------------------------------------------------------------------------------------------------------- */
  handleError(error: Error) {
    return throwError(() => {
      return 'Unknown Error occured..Please try again';
    });
  }

  //---------------------------------------------------------------------------------------------------------------------------------------

}