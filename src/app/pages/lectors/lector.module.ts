import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvolveComponent } from './involve/involve.component';
import { PercentageComponent } from './percentage/percentage.component';
import { QueryStudentsComponent } from './query-students/query-students.component';
import { LeaderComponent } from './leader/leader.component';
import { PercentageControlComponent } from './percentage-control/percentage-control.component';
import { AngularLibraryModule } from '../../modules/library/angular-library/angular-library.module';
import { MaterialDesignModule } from '../../modules/library/material-design/material-design.module';
import { ComponentsModule } from '../../components/components.module';
import { StudentModule } from '../students/student.module';
import { BootstrapModule } from '../../modules/library/bootstrap/bootstrap.module';
import { StoragesModule } from '../../storage/storages.module';
import { WorkersModule } from '../../workers/workers.module';
import {PrimeNGModule} from '../../modules/library/prime-ng/prime-ng.module';

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
