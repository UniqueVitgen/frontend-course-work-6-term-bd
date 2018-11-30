import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PercentDirective } from '../../../directives/percent/percent.directive';
import { DisableControlDirective } from '../../../directives/disable-control/disable-control.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PercentDirective,
    DisableControlDirective
  ],
  exports: [
    PercentDirective,
    DisableControlDirective
  ]
})
export class DirectivesModule { }
