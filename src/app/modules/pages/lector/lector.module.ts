import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvolveComponent } from '../../../pages/lectors/involve/involve.component';
import { PercentageComponent } from '../../../pages/lectors/percentage/percentage.component';
import { QueryStudentsComponent } from '../../../pages/lectors/query-students/query-students.component';
import { LeaderComponent } from '../../../pages/lectors/leader/leader.component';
import { PercentageControlComponent } from '../../../pages/lectors/percentage-control/percentage-control.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    QueryStudentsComponent,
    InvolveComponent,
    PercentageComponent,
    LeaderComponent,
    PercentageControlComponent
  ],
  exports: [
    QueryStudentsComponent,
    InvolveComponent,
    PercentageComponent,
    LeaderComponent,
    PercentageControlComponent
  ]
})
export class LectorModule { }
