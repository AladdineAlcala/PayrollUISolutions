import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { DeductionCreateComponent } from './components/deductions/deduction-create/deduction-create.component';
import { DeductionMainComponent } from './components/deductions/deduction-main/deduction-main.component';
import { DeductionsidebarComponent } from './components/deductions/deductionsidebar/deductionsidebar.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';

const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
}

const approutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path:'attendance',loadChildren:()=> import('./components/attendance/attendance.module').then(m=>m.AttendanceModule)}
  ,
  { path: 'deductions', component: DeductionsidebarComponent, outlet: 'side' },
  {
    path: 'deductions/main',
    component: DeductionMainComponent,
    outlet: 'main',
    /*  resolve:{
                  empres:EmployeeResolver
                 } */
  },
  {
    path: 'deductions/add',
    component: DeductionCreateComponent,
    outlet: 'main',
  },

  { path: 'error', component: ErrorpageComponent,outlet: 'main' },
  { path: '**', component: NotfoundpageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(approutes,routingConfiguration)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

