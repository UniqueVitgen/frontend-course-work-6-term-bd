import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule, BsDatepickerModule, TimepickerModule, TooltipModule } from 'ngx-bootstrap';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [],
  exports: [
    ModalModule,
    BsDatepickerModule,
    TimepickerModule,
    TooltipModule
  ]
})
export class BootstrapModule { }
