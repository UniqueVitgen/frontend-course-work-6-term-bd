import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDiplomComponent } from '../../../pages/students/select-diplom/select-diplom.component';
import { SelectTeacherComponent } from '../../../pages/students/select-teacher/select-teacher.component';
import { LectorStaffComponent } from '../../../pages/students/lector-staff/lector-staff.component';
import { NewsComponent } from '../../../pages/students/news/news.component';
import { DiplomWorkStudentComponent } from '../../../pages/students/diplom-work-student/diplom-work-student.component';
import { AngularLibraryModule } from '../../library/angular-library/angular-library.module';
import { MaterialDesignModule } from '../../library/material-design/material-design.module';
import { BootstrapModule } from '../../library/bootstrap/bootstrap.module';
import { StoragesModule } from '../../others/storages/storages.module';
import { WorkersModule } from '../../others/workers/workers.module';
import {CommonPagesModule} from '../common-pages/common-pages.module';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    AngularLibraryModule,
    BootstrapModule,
    MaterialDesignModule,
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
