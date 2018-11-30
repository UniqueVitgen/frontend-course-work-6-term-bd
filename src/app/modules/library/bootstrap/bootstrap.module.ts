import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule, BsDatepickerModule, TimepickerModule, TooltipModule } from 'ngx-bootstrap';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsModalModule } from 'ng2-bs3-modal';


@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    BsModalModule,

    TooltipModule.forRoot()
  ],
  declarations: [],
  exports: [
    ModalModule,
    BsDatepickerModule,
    TimepickerModule,
    TooltipModule,
    BsModalModule
  ]
})
export class BootstrapModule { }
