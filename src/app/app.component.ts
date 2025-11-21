import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './Services/flowbite/flowbite.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptorService } from './interceptors/my-interceptor.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[
     {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptorService,
      multi: true
    }
  ]
})
export class AppComponent implements OnInit {

  title = 'Recipe';

    constructor(private flowbiteService: FlowbiteService) {}




   ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
    });
  }


}
