import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DynamictransformPipe } from "src/app/pipes/dynamictransform.pipe";
import { LoaderComponent } from "./loader/loader.component";
import { TableBootstrapComponent } from "./table-bootstrap/table-bootstrap.component";
import { TitleHeaderComponent } from "./title-header/title-header.component";


@NgModule({
    declarations:[
        TitleHeaderComponent,
        TableBootstrapComponent,
        DynamictransformPipe,
        LoaderComponent
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
    ]
})
export class SharedModule{

}