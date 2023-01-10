import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DynamictransformPipe } from "src/app/pipes/dynamictransform.pipe";
import { MaincontainerComponent } from "./container/maincontainer/maincontainer.component";
import { LoaderComponent } from "./widgets/loader/loader.component";
import { TableBootstrapComponent } from "./widgets/table-bootstrap/table-bootstrap.component";
import { TitleHeaderComponent } from "./widgets/title-header/title-header.component";
import { ClosebuttonComponent } from './widgets/closebutton/closebutton.component';
import { EditableComponent } from './widgets/editable/editable.component';


@NgModule({
    declarations:[
        TitleHeaderComponent,
        TableBootstrapComponent,
        DynamictransformPipe,
        LoaderComponent,
        MaincontainerComponent,
        ClosebuttonComponent,
        EditableComponent,

    ],
    imports:[
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,

     
    ],
    exports:[
        TitleHeaderComponent,
        TableBootstrapComponent,
        DynamictransformPipe,
        LoaderComponent,
        MaincontainerComponent,
        ClosebuttonComponent,
        EditableComponent
 
    ]
})
export class SharedModule{

}