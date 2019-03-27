import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyAdminComponent } from './faculty-admin/faculty-admin.component';
import { SpecializationAdminComponent } from './specialization-admin/specialization-admin.component';
import { GroupAdminComponent } from './group-admin/group-admin.component';
import { LectorAdminComponent } from './lector-admin/lector-admin.component';
import { StudentAdminComponent } from './student-admin/student-admin.component';
import { NewsAdminComponent } from './news-admin/news-admin.component';
import { TitleAdminComponent } from './title-admin/title-admin.component';
import { PostAdminComponent } from './post-admin/post-admin.component';
import { DegreeAdminComponent } from './degree-admin/degree-admin.component';
import { QualificationAdminComponent } from './qualification-admin/qualification-admin.component';
import { DiplomWorkAdminComponent } from './diplom-work-admin/diplom-work-admin.component';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { AngularLibraryModule } from '../../modules/library/angular-library/angular-library.module';
import { MaterialDesignModule } from '../../modules/library/material-design/material-design.module';
import { ComponentsModule } from '../../components/components.module';
import { CommonPagesModule } from '../common/common-pages.module';
import { BootstrapModule } from '../../modules/library/bootstrap/bootstrap.module';
import { StudentModule } from '../students/student.module';
import { StoragesModule } from '../../storage/storages.module';
import { WorkersModule } from '../../workers/workers.module';
import { SECRoleAdminComponent } from './secrole-admin/secrole-admin.component';
import { SECAdminComponent } from './secadmin/secadmin.component';
import { StatusAdminComponent } from './status-admin/status-admin.component';
import { RoleAdminComponent } from './role-admin/role-admin.component';
import { UniversityAdminComponent } from './university-admin/university-admin.component';
import { DepartmentAdminComponent } from './department-admin/department-admin.component';
import {Ej2Module} from '../../modules/library/ej2/ej2.module';
import {PrimeNGModule} from '../../modules/library/prime-ng/prime-ng.module';

@NgModule({
  imports: [
    CommonModule,
    AngularLibraryModule,
    MaterialDesignModule,
    PrimeNGModule,
    BootstrapModule,
    ComponentsModule,
    CommonPagesModule,
    StudentModule,
    StoragesModule,
    WorkersModule
  ],
  declarations: [
    FacultyAdminComponent,
    SpecializationAdminComponent,
    GroupAdminComponent,
    LectorAdminComponent,
    StudentAdminComponent,
    QualificationAdminComponent,
    NewsAdminComponent,
    TitleAdminComponent,
    DegreeAdminComponent,
    PostAdminComponent,
    DiplomWorkAdminComponent,
    UsersAdminComponent,
    SECAdminComponent,
    SECRoleAdminComponent,
    StatusAdminComponent,
    RoleAdminComponent,
    UniversityAdminComponent,
    DepartmentAdminComponent
  ],
  exports: [
    FacultyAdminComponent,
    SpecializationAdminComponent,
    GroupAdminComponent,
    LectorAdminComponent,
    StudentAdminComponent,
    QualificationAdminComponent,
    NewsAdminComponent,
    TitleAdminComponent,
    DegreeAdminComponent,
    PostAdminComponent,
    DiplomWorkAdminComponent,
    UsersAdminComponent,
    SECAdminComponent,
    SECRoleAdminComponent,
    StatusAdminComponent,
    RoleAdminComponent,
    UniversityAdminComponent,
    DepartmentAdminComponent
  ]
})
export class AdminModule { }
