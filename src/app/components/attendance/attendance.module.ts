import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceMainComponent } from './attendance-main/attendance-main.component';
import { AttendanceSidebarComponent } from './attendance-sidebar/attendance-sidebar.component';
import { AttendanceCreateComponent } from './attendance-create/attendance-create.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AttendanceTableLogsComponent } from './attendance-table-logs/attendance-table-logs.component';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AttendanceLogdetailsComponent } from './attendance-logdetails/attendance-logdetails.component';
import { AttendanceRoutingModule } from './attendance-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import { AttendanceLogdatailsTableLogsComponent } from './attendance-logdatails-table-logs/attendance-logdatails-table-logs.component';
import { LoglistTableEmpComponent } from './loglist-table-emp/loglist-table-emp.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { TableCellClickEventDirective } from 'src/app/directives/oncellclick.directive';
import { EditModeDirective } from 'src/app/directives/editmode.directive';
import { ViewModeDirective } from 'src/app/directives/viewmode.directive';
/* import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';   */

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


@NgModule({
  declarations: [
    AttendanceMainComponent,
    AttendanceSidebarComponent,
    AttendanceCreateComponent,
    AttendanceTableLogsComponent,
    AttendanceLogdetailsComponent,
    AttendanceLogdatailsTableLogsComponent,
    LoglistTableEmpComponent,
    TableCellClickEventDirective,
    EditModeDirective,
    ViewModeDirective
  ],

  imports: [
    AttendanceRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatCardModule,
    SharedModule,
    MatTabsModule,
    MatSortModule,
    MatProgressSpinnerModule,
  /*   NgxMatTimepickerModule */

  NgxMaterialTimepickerModule
  ]
  ,
  exports:[
    TableCellClickEventDirective,
    EditModeDirective,
    ViewModeDirective
  ]
})
export class AttendanceModule { }
