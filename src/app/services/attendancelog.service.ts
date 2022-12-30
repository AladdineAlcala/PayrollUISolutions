import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, shareReplay, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AttendanceLogFetch } from '../models/attendancelog';

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
    let dateparam = {
      DtStart: dateStart.toISOString(),
      DtEnd: dateEnd.toISOString(),
    };
    this.url = 'timelog';

    let params = new HttpParams();
    params = params.append('DtStart', dateparam.DtStart);
    params = params.append('DtEnd', dateparam.DtEnd);

    // console.log(dateparam)

    return this.http
      .get<AttendanceLogFetch[]>(`${environment.base_api_DeviceUrl}/${this.url}/`, {
        params,
      })
      .pipe(delay(2000), map(data=>data),
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