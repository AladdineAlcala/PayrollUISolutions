import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { DeductionDetails } from 'src/app/models/deductiondetails';
import { DeductionService } from 'src/app/services/deduction.service';

@Injectable({
  providedIn: 'root',
})
export class GetdeductionResolver implements Resolve<DeductionDetails[]> {
  constructor(
    private deductionService: DeductionService,
    private router: Router
  ) {}

  resolve():
    | Observable<DeductionDetails[]>
    | Promise<DeductionDetails[]>
    | DeductionDetails[] {
    return this.deductionService.getdeductions$.pipe(
      delay(2000),
      map(data=> data.result as DeductionDetails[]),
    
      catchError((error) => {
        this.router.navigate(['/error']);
        // console.info('error has encountered by employee resolver');
        return throwError(() => new Error('Could not load data........'));
      })
    );
  }
}
