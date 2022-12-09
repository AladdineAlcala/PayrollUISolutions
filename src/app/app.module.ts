import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpServiceInterceptor } from './interceptors/http-service.interceptor';


import { NavbarComponent } from './shared/navbar/navbar.component';
import { EmployeeModule } from './components/employee/employee.module';
import { AttendanceMainComponent } from './components/attendance/attendance-main/attendance-main.component';
import { AttendanceSidebarComponent } from './components/attendance/attendance-sidebar/attendance-sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { DeductionCreateComponent } from './components/deductions/deduction-create/deduction-create.component';
import { DeductionMainComponent } from './components/deductions/deduction-main/deduction-main.component';
import { DeductionsidebarComponent } from './components/deductions/deductionsidebar/deductionsidebar.component';
import { PayrollsidebarComponent } from './components/payroll/payrollsidebar/payrollsidebar.component';
import { PayrollMainComponent } from './components/payroll/payroll-main/payroll-main.component';
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundpageComponent,
    ErrorpageComponent,
    DeductionCreateComponent,
    NavbarComponent,
    DeductionsidebarComponent,
    PayrollMainComponent,
    PayrollsidebarComponent,
    DeductionMainComponent,
    AttendanceMainComponent,
    AttendanceSidebarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeModule

  ],
  providers:
   [
   {provide:HTTP_INTERCEPTORS,useClass:HttpServiceInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
