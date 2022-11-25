import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Position } from '../models/position';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private _url = 'position';

  position$=this.getallposition();

  constructor(private http: HttpClient) {}

  private getallposition() {
    return this.http
      .get<Position[]>(`${environment.base_apiUrl}/${this._url}`)
      .pipe(map((data) => data), catchError(this.handleError));
  }

  private handleError(error: Error) {
    return throwError(() => {
      return 'Unknown Error occured..Please try again';
    });
  }
}
