import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//form
import { FacultyFormComponent } from '../../components/forms/faculty-form/faculty-form.component';
import { SpecializationFormComponent } from '../../components/forms/specialization-form/specialization-form.component';
import { GroupFormComponent } from '../../components/forms/group-form/group-form.component';
import { NewsFormComponent } from '../../components/forms/news-form/news-form.component';
import { TitleFormComponent } from '../../components/forms/title-form/title-form.component';
import { DegreeFormComponent } from '../../components/forms/degree-form/degree-form.component';
import { PostFormComponent } from '../../components/forms/post-form/post-form.component';
import { SignInComponent } from '../../components/forms/sign-in/sign-in.component';
import { PercentageFormComponent } from '../../components/forms/percentage-form/percentage-form.component';
import { QualificationFormComponent } from '../../components/forms/qualification-form/qualification-form.component';

import { SelectLectorComponent } from '../../components/select/select-lector/select-lector.component';
import { FileUploadComponent } from '../../components/file/file-upload/file-upload.component';
import { SelectImageComponent } from '../../components/select/select-image/select-image.component';
import { SECRoleFormComponent } from '../../components/forms/secrole-form/secrole-form.component';
import { NewsCardComponent } from '../../components/card/news-card/news-card.component';
import { SECDateFormComponent } from '../../components/forms/secdate-form/secdate-form.component';
import { StudentCardComponent } from '../../components/card/student-card/student-card.component';
import { SECUserFormComponent } from '../../components/forms/secuser-form/secuser-form.component';
import { SECFormComponent } from '../../components/forms/secform/secform.component';
import { SECEventFormComponent } from '../../components/forms/secevent-form/secevent-form.component';
import { SelectGroupComponent } from '../../components/select/select-group/select-group.component';
import { DiplomWorkTitleFormComponent } from '../../components/forms/diplom-work-title-form/diplom-work-title-form.component';
import { FormsModule } from '@angular/forms';
import { AngularLibraryModule } from '../library/angular-library/angular-library.module';
import { MaterialDesignModule } from '../library/material-design/material-design.module';
import { DirectivesModule } from '../others/directives/directives.module';
import { BootstrapModule } from '../library/bootstrap/bootstrap.module';
import { StoragesModule } from '../others/storages/storages.module';
import { WorkersModule } from '../others/workers/workers.module';
import { UserAccordionComponent } from '../../components/accordion/user-accordion/user-accordion.component';
import { GroupTableComponent } from '../../components/table/group-table/group-table.component';
import { SearchInputComponent } from '../../components/input/search-input/search-input.component';
import { StatusTableComponent } from '../../components/table/status-table/status-table.component';
import { RoleTableComponent } from '../../components/table/role-table/role-table.component';
import { SECTableComponent } from '../../components/table/sectable/sectable.component';
import { SECRoleTableComponent } from '../../components/table/secrole-table/secrole-table.component';
import { RoleFormComponent } from '../../components/forms/role-form/role-form.component';
import { StatusFormComponent } from '../../components/forms/status-form/status-form.component';
import { UniversityTableComponent } from '../../components/table/university-table/university-table.component';
import { UniversityFormComponent } from '../../components/forms/university-form/university-form.component';
import { DepartmentFormComponent } from '../../components/forms/department-form/department-form.component';
import { DepartmentTableComponent } from '../../components/table/department-table/department-table.component';

@NgModule({
  imports: [
    CommonModule,
    AngularLibraryModule,
    MaterialDesignModule,
    BootstrapModule,
    DirectivesModule,
    StoragesModule,
    WorkersModule,
    
  ],
  declarations: [
    
    SignInComponent,

    FacultyFormComponent,
    SpecializationFormComponent,
    GroupFormComponent,
    NewsFormComponent,
    TitleFormComponent,
    DegreeFormComponent,
    PostFormComponent,
    SelectLectorComponent,
    FileUploadComponent,
    SelectImageComponent,
    PercentageFormComponent,
    QualificationFormComponent,
    DiplomWorkTitleFormComponent,
    SECFormComponent,
    SECEventFormComponent,
    SelectGroupComponent,
    SECUserFormComponent,
    SECRoleFormComponent,
    NewsCardComponent,
    SECDateFormComponent,
    StudentCardComponent,
    UserAccordionComponent,
    GroupTableComponent,
    SearchInputComponent,
    RoleTableComponent,
    SECTableComponent,
    SECRoleTableComponent,
    StatusTableComponent,
    RoleFormComponent,
    StatusFormComponent,
    UniversityTableComponent,
    UniversityFormComponent,
    DepartmentFormComponent,
    DepartmentTableComponent
  ],
  entryComponents: [
    SignInComponent,
    SelectLectorComponent,
    FacultyFormComponent,
    SpecializationFormComponent,
    GroupFormComponent,
    DegreeFormComponent,
    PostFormComponent,
    TitleFormComponent,
    NewsFormComponent,
    FileUploadComponent,
    SelectImageComponent,
    SelectGroupComponent,
    PercentageFormComponent,
    QualificationFormComponent,
    DiplomWorkTitleFormComponent,
    SECFormComponent,
    SECEventFormComponent,
    SECUserFormComponent,
    RoleFormComponent,
    StatusFormComponent,
    SECRoleFormComponent,
    SECDateFormComponent,
    UniversityFormComponent,
    DepartmentFormComponent
  ],
  exports: [
    
    SignInComponent,

    FacultyFormComponent,
    SpecializationFormComponent,
    GroupFormComponent,
    NewsFormComponent,
    TitleFormComponent,
    DegreeFormComponent,
    PostFormComponent,
    SelectLectorComponent,
    FileUploadComponent,
    SelectImageComponent,
    PercentageFormComponent,
    QualificationFormComponent,
    DiplomWorkTitleFormComponent,
    SECFormComponent,
    SECEventFormComponent,
    SelectGroupComponent,
    SECUserFormComponent,
    SECRoleFormComponent,
    NewsCardComponent,
    SECDateFormComponent,
    StudentCardComponent,
    UserAccordionComponent,
    GroupTableComponent,
    SearchInputComponent,
    RoleTableComponent,
    SECTableComponent,
    SECRoleTableComponent,
    StatusTableComponent,
    RoleFormComponent,
    StatusFormComponent,
    UniversityTableComponent,
    UniversityFormComponent,
    DepartmentFormComponent,
    DepartmentTableComponent
  ]
})
export class ComponentsModule { }
