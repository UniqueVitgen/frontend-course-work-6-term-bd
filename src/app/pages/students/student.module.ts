import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDiplomComponent } from './select-diplom/select-diplom.component';
import { SelectTeacherComponent } from './select-teacher/select-teacher.component';
import { LectorStaffComponent } from './lector-staff/lector-staff.component';
import { NewsComponent } from './news/news.component';
import { DiplomWorkStudentComponent } from './diplom-work-student/diplom-work-student.component';
import { AngularLibraryModule } from '../../modules/library/angular-library/angular-library.module';
import { MaterialDesignModule } from '../../modules/library/material-design/material-design.module';
import { BootstrapModule } from '../../modules/library/bootstrap/bootstrap.module';
import { StoragesModule } from '../../storage/storages.module';
import { WorkersModule } from '../../workers/workers.module';
import {CommonPagesModule} from '../common/common-pages.module';
import {ComponentsModule} from '../../components/components.module';
import {PrimeNGModule} from '../../modules/library/prime-ng/prime-ng.module';

@NgModule({
  imports: [
    CommonModule,
    AngularLibraryModule,
    BootstrapModule,
    MaterialDesignModule,
    PrimeNGModule,
    StoragesModule,
    ComponentsModule,
    // CommonPagesModule,
    WorkersModule
  ],
  declarations: [
    SelectDiplomComponent,
    SelectTeacherComponent,
    LectorStaffComponent,
    NewsComponent,
    DiplomWorkStudentComponent
  ],
  exports: [
    SelectDiplomComponent,
    SelectTeacherComponent,
    LectorStaffComponent,
    NewsComponent,
    DiplomWorkStudentComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class StudentModule { }
