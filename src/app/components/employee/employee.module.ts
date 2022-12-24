import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';


import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { AdvancesComponent } from './employee-details/advances/advances.component';
import { CashbondComponent } from './employee-details/cashbond/cashbond.component';
import { DeductionCreateUpdateEmployeeComponent } from './employee-details/deduction/deduction-createupdate-employee/deduction-createupdate-employee.component';
import { DeductionComponent } from './employee-details/deduction/deduction.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { ProfileComponent } from './employee-details/profile/profile.component';
import { TabtemplateComponent } from './employee-details/tabtemplate/tabtemplate.component';
import { WageComponent } from './employee-details/wage/wage.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee-main/employee.component';
import { EmployeesidebarComponent } from './employeesidebar/employeesidebar.component';
import { TitleHeaderComponent } from 'src/app/shared/widgets/title-header/title-header.component';
import { SharedModule } from 'src/app/shared/widgets/shared.module';
import { LoaderComponent } from 'src/app/shared/widgets/loader/loader.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
    declarations: [
        EmployeesidebarComponent,
        EmployeeComponent,
        EmployeeListComponent,
        EmployeeDetailsComponent,
        EmployeeCreateComponent,
        EmployeeEditComponent,
        TabtemplateComponent,
        WageComponent,
        AdvancesComponent,
        CashbondComponent,
        DeductionComponent,
        ProfileComponent,
        DeductionCreateUpdateEmployeeComponent,
       
    ],
    exports: [
        EmployeeComponent,
        EmployeeListComponent,
        EmployeeDetailsComponent,
        EmployeeCreateComponent,
        EmployeeEditComponent,
        EmployeesidebarComponent,
        TabtemplateComponent,
        WageComponent,
        AdvancesComponent,
        CashbondComponent,
        DeductionComponent,
        ProfileComponent,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
      
    ],
    imports: [
        RouterModule,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SharedModule,
        MatPaginatorModule 
    ]
})
export class EmployeeModule {}
