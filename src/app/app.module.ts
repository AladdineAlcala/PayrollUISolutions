import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpServiceInterceptor } from './interceptors/http-service.interceptor';


import { NavbarComponent } from './shared/widgets/navbar/navbar.component';
import { EmployeeModule } from './components/employee/employee.module';
import { HomeComponent } from './components/home/home.component';
import { DeductionCreateComponent } from './components/deductions/deduction-create/deduction-create.component';
import { DeductionMainComponent } from './components/deductions/deduction-main/deduction-main.component';
import { DeductionsidebarComponent } from './components/deductions/deductionsidebar/deductionsidebar.component';
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { ButtonLoadingComponent } from './shared/widgets/button-loading/button-loading.component';
import { SidebarComponent } from './shared/widgets/sidebar/sidebar.component';
import { SharedModule } from './shared/shared.module';
import { PayrollModule } from './components/payroll/payroll.module';
import { DatePipe } from '@angular/common';

import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AttendanceModule } from './components/attendance/attendance.module';




@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NotfoundpageComponent,
        ErrorpageComponent,
        DeductionCreateComponent,
        NavbarComponent,
        DeductionsidebarComponent,
        DeductionMainComponent,
        ButtonLoadingComponent,
        SidebarComponent,

     
    ],
    providers: [
        DatePipe,
        { provide: HTTP_INTERCEPTORS, useClass: HttpServiceInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
    imports: [
    
        BrowserModule,
        EmployeeModule,
        AttendanceModule,
        PayrollModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgxSpinnerModule,
        BrowserAnimationsModule,
      
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
