import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SECComponent } from '../../../pages/secretary/sec/sec.component';
import { SECListComponent } from '../../../pages/secretary/seclist/seclist.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SECListComponent,
    SECComponent
  ],
  exports: [
    SECListComponent,
    SECComponent
  ]
})
export class SecretaryModule { }
