import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { DeductionsComponent } from './components/deductions/deductions.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeEditComponent } from './components/employee/employee-edit/employee-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { DeductionCreateComponent } from './components/deductions/deduction-create/deduction-create.component';
import { HttpServiceInterceptor } from './interceptors/http-service.interceptor';
import { EmployeesidebarComponent } from './components/employee/employeesidebar/employeesidebar.component';
import { DeductionsidebarComponent } from './components/deductions/deductionsidebar/deductionsidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DeductionmainComponent } from './components/deductions/deductionmain/deductionmain.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeListComponent,
    DeductionsComponent,
    EmployeeDetailsComponent,
    EmployeeCreateComponent,
    HomeComponent,
    EmployeeEditComponent,
    NotfoundpageComponent,
    ErrorpageComponent,
    DeductionCreateComponent,
    EmployeesidebarComponent,
    DeductionsidebarComponent,
    NavbarComponent,
    DeductionmainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
           {provide:HTTP_INTERCEPTORS,useClass:HttpServiceInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 


  
}
