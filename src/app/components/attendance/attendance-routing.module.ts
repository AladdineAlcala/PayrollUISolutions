import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AttendanceCreateComponent } from "./attendance-create/attendance-create.component";
import { AttendanceLogdetailsComponent } from "./attendance-logdetails/attendance-logdetails.component";
import { AttendanceMainComponent } from "./attendance-main/attendance-main.component";
import { AttendanceSidebarComponent } from "./attendance-sidebar/attendance-sidebar.component";




const attendanceRoutes:Routes=[

    {
        path:'attendance',
        component:AttendanceSidebarComponent,
        outlet:'side'
      },
      {
        path: 'attendance',
        component: AttendanceMainComponent,
        outlet: 'main'
      },
      {
        path: 'attendance/create',
        component: AttendanceCreateComponent,
        outlet: 'main'
      },

      {
        path: 'attendance/log-details',
        component:AttendanceLogdetailsComponent,
        outlet: 'main'
      }

];


@NgModule({
imports:[
    RouterModule.forChild(attendanceRoutes)
],
exports:[RouterModule]
})
export class AttendanceRoutingModule{

}