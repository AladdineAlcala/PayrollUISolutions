import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

<<<<<<< HEAD
=======

import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { DeductionsComponent } from './components/deductions/deductions.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
>>>>>>> a5aa619761684ad7d6312ee7654f8db949c692d8
import { HomeComponent } from './components/home/home.component';

import { DeductionsComponent } from './components/deductions/deductions.component';
import { DeductionCreateComponent } from './components/deductions/deduction-create/deduction-create.component';
import { DeductionMainComponent } from './components/deductions/deduction-main/deduction-main.component';
import { DeductionsidebarComponent } from './components/deductions/deductionsidebar/deductionsidebar.component';

import { PayrollsidebarComponent } from './components/payroll/payrollsidebar/payrollsidebar.component';
import { PayrollMainComponent } from './components/payroll/payroll-main/payroll-main.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
<<<<<<< HEAD
import { HttpServiceInterceptor } from './interceptors/http-service.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './shared/navbar/navbar.component';

import { EmployeeModule } from './components/employee/employee.module';

=======
import { DeductionCreateComponent } from './components/deductions/deduction-create/deduction-create.component';
import { HttpServiceInterceptor } from './interceptors/http-service.interceptor';
import { EmployeesidebarComponent } from './components/employee/employeesidebar/employeesidebar.component';
import { DeductionsidebarComponent } from './components/deductions/deductionsidebar/deductionsidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DeductionmainComponent } from './components/deductions/deductionmain/deductionmain.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
>>>>>>> a5aa619761684ad7d6312ee7654f8db949c692d8

@NgModule({
  declarations: [
    AppComponent,
    DeductionsComponent,
    HomeComponent,
    NotfoundpageComponent,
    ErrorpageComponent,
    DeductionCreateComponent,
<<<<<<< HEAD
    NavbarComponent,
    DeductionsidebarComponent,
    PayrollMainComponent,
    PayrollsidebarComponent,
    DeductionMainComponent,

=======
    EmployeesidebarComponent,
    DeductionsidebarComponent,
    NavbarComponent,
    DeductionmainComponent
>>>>>>> a5aa619761684ad7d6312ee7654f8db949c692d8
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    EmployeeModule

=======
    BrowserAnimationsModule
>>>>>>> a5aa619761684ad7d6312ee7654f8db949c692d8
  ],
  providers: [
           {provide:HTTP_INTERCEPTORS,useClass:HttpServiceInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
