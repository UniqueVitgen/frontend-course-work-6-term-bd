import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyAdminComponent } from '../../../pages/admin/faculty-admin/faculty-admin.component';
import { SpecializationAdminComponent } from '../../../pages/admin/specialization-admin/specialization-admin.component';
import { GroupAdminComponent } from '../../../pages/admin/group-admin/group-admin.component';
import { LectorAdminComponent } from '../../../pages/admin/lector-admin/lector-admin.component';
import { StudentAdminComponent } from '../../../pages/admin/student-admin/student-admin.component';
import { NewsAdminComponent } from '../../../pages/admin/news-admin/news-admin.component';
import { TitleAdminComponent } from '../../../pages/admin/title-admin/title-admin.component';
import { PostAdminComponent } from '../../../pages/admin/post-admin/post-admin.component';
import { DegreeAdminComponent } from '../../../pages/admin/degree-admin/degree-admin.component';
import { QualificationAdminComponent } from '../../../pages/admin/qualification-admin/qualification-admin.component';
import { DiplomWorkAdminComponent } from '../../../pages/admin/diplom-work-admin/diplom-work-admin.component';
import { UsersAdminComponent } from '../../../pages/admin/users-admin/users-admin.component';
import { AngularLibraryModule } from '../../library/angular-library/angular-library.module';
import { MaterialDesignModule } from '../../library/material-design/material-design.module';
import { ComponentsModule } from '../../components/components.module';
import { CommonPagesModule } from '../common-pages/common-pages.module';
import { BootstrapModule } from '../../library/bootstrap/bootstrap.module';
import { StudentModule } from '../student/student.module';
import { StoragesModule } from '../../others/storages/storages.module';
import { WorkersModule } from '../../others/workers/workers.module';
import { SECRoleAdminComponent } from '../../../pages/admin/secrole-admin/secrole-admin.component';
import { SECAdminComponent } from '../../../pages/admin/secadmin/secadmin.component';
import { StatusAdminComponent } from '../../../pages/admin/status-admin/status-admin.component';
import { RoleAdminComponent } from '../../../pages/admin/role-admin/role-admin.component';
import { UniversityAdminComponent } from '../../../pages/admin/university-admin/university-admin.component';
import { DepartmentAdminComponent } from '../../../pages/admin/department-admin/department-admin.component';

@NgModule({
  imports: [
    CommonModule,
    AngularLibraryModule,
    MaterialDesignModule,
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
