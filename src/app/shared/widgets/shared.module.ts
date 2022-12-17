import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { DynamictransformPipe } from "src/app/pipes/dynamictransform.pipe";
import { TableBootstrapComponent } from "./table-bootstrap/table-bootstrap.component";
import { TitleHeaderComponent } from "./title-header/title-header.component";


@NgModule({
    declarations:[
        TitleHeaderComponent,
        TableBootstrapComponent,
        DynamictransformPipe,

    ],
    imports:[
        CommonModule,
        MatIconModule,
        MatButtonModule,
      
    ],
    exports:[
        TitleHeaderComponent,
        TableBootstrapComponent,
        DynamictransformPipe,

    ]
})
export class SharedModule{

}