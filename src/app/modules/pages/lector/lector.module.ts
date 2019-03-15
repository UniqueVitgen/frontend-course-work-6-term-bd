import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvolveComponent } from '../../../pages/lectors/involve/involve.component';
import { PercentageComponent } from '../../../pages/lectors/percentage/percentage.component';
import { QueryStudentsComponent } from '../../../pages/lectors/query-students/query-students.component';
import { LeaderComponent } from '../../../pages/lectors/leader/leader.component';
import { PercentageControlComponent } from '../../../pages/lectors/percentage-control/percentage-control.component';
import { AngularLibraryModule } from '../../library/angular-library/angular-library.module';
import { MaterialDesignModule } from '../../library/material-design/material-design.module';
import { ComponentsModule } from '../../components/components.module';
import { StudentModule } from '../student/student.module';
import { BootstrapModule } from '../../library/bootstrap/bootstrap.module';
import { StoragesModule } from '../../others/storages/storages.module';
import { WorkersModule } from '../../others/workers/workers.module';
import {PrimeNGModule} from '../../library/prime-ng/prime-ng.module';

@NgModule({
  imports: [
    CommonModule,
    AngularLibraryModule,
    MaterialDesignModule,
    PrimeNGModule,
    BootstrapModule,
    ComponentsModule,
    StoragesModule,
    WorkersModule,
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
