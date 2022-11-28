import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeductionsComponent } from './components/deductions/deductions.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { EmployeeEditComponent } from './components/employee/employee-edit/employee-edit.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [

  { path:'',redirectTo:'/home',pathMatch:'full'},
  { path:'employees',component:EmployeeComponent},
  { path:'employee/add',component:EmployeeCreateComponent},
  { path:'employee/details/:id',component:EmployeeDetailsComponent},
  { path:'employee/edit/:id',component:EmployeeEditComponent},
  { path:'deduction',component:DeductionsComponent},
  { path:'**',component:HomeComponent,pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
