import { Component} from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'loading',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  
  message:string="";

  loading$=this.loadingService.loading$;
  message$=this.loadingService.message$

  constructor(public loadingService:LoadingService) {

    //this.loadingService.loadingOn()
  }

}
