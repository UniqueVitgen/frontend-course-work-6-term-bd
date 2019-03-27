import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
//form
import {FacultyFormComponent} from './forms/faculty-form/faculty-form.component';
import {SpecializationFormComponent} from './forms/specialization-form/specialization-form.component';
import {GroupFormComponent} from './forms/group-form/group-form.component';
import {NewsFormComponent} from './forms/news-form/news-form.component';
import {TitleFormComponent} from './forms/title-form/title-form.component';
import {DegreeFormComponent} from './forms/degree-form/degree-form.component';
import {PostFormComponent} from './forms/post-form/post-form.component';
import {SignInComponent} from './forms/sign-in/sign-in.component';
import {PercentageFormComponent} from './forms/percentage-form/percentage-form.component';
import {QualificationFormComponent} from './forms/qualification-form/qualification-form.component';

import {SelectLectorComponent} from './select/select-lector/select-lector.component';
import {FileUploadComponent} from './file/file-upload/file-upload.component';
import {SelectImageComponent} from './select/select-image/select-image.component';
import {SECRoleFormComponent} from './forms/secrole-form/secrole-form.component';
import {NewsCardComponent} from './card/news-card/news-card.component';
import {SECDateFormComponent} from './forms/secdate-form/secdate-form.component';
import {SECUserFormComponent} from './forms/secuser-form/secuser-form.component';
import {SECFormComponent} from './forms/secform/secform.component';
import {SECEventFormComponent} from './forms/secevent-form/secevent-form.component';
import {SelectGroupComponent} from './select/select-group/select-group.component';
import {DiplomWorkTitleFormComponent} from './forms/diplom-work-title-form/diplom-work-title-form.component';
import {AngularLibraryModule} from '../modules/library/angular-library/angular-library.module';
import {MaterialDesignModule} from '../modules/library/material-design/material-design.module';
import {DirectivesModule} from '../directives/directives.module';
import {BootstrapModule} from '../modules/library/bootstrap/bootstrap.module';
import {StoragesModule} from '../storage/storages.module';
import {WorkersModule} from '../workers/workers.module';
import {UserAccordionComponent} from './accordion/user-accordion/user-accordion.component';
import {GroupTableComponent} from './table/group-table/group-table.component';
import {SearchInputComponent} from './input/search-input/search-input.component';
import {StatusTableComponent} from './table/status-table/status-table.component';
import {RoleTableComponent} from './table/role-table/role-table.component';
import {SECTableComponent} from './table/sectable/sectable.component';
import {SECRoleTableComponent} from './table/secrole-table/secrole-table.component';
import {RoleFormComponent} from './forms/role-form/role-form.component';
import {StatusFormComponent} from './forms/status-form/status-form.component';
import {UniversityTableComponent} from './table/university-table/university-table.component';
import {UniversityFormComponent} from './forms/university-form/university-form.component';
import {DepartmentFormComponent} from './forms/department-form/department-form.component';
import {DepartmentTableComponent} from './table/department-table/department-table.component';
import {DiplomWorkLectorsFormComponent} from './forms/diplom-work-lectors-form/diplom-work-lectors-form.component';
import {LectorTableComponent} from './table/lector-table/lector-table.component';
import {LectorCountDiplomFormComponent} from './forms/lector-count-diplom-form/lector-count-diplom-form.component';
import {SpecializationTableComponent} from './table/specialization-table/specialization-table.component';
import {SelectSpecializationComponent} from './select/select-specialization/select-specialization.component';
import {SelectDepartmentComponent} from './select/select-department/select-department.component';
import {Ej2Module} from '../modules/library/ej2/ej2.module';
import {UserAvatarComponent} from './avatar/user-avatar/user-avatar.component';
import {UserTableComponent} from './table/user-table/user-table.component';
import {SECNumberFormComponent} from './forms/secnumber-form/secnumber-form.component';
import {ChangePasswordFormComponent} from './forms/change-password-form/change-password-form.component';
import {PrimeNGModule} from '../modules/library/prime-ng/prime-ng.module';
import {SECEventTableComponent} from './table/secevent-table/secevent-table.component';
import {StudentTableComponent} from './table/student-table/student-table.component';
import {LectorsAccordionComponent} from './accordion/lectors-accordion/lectors-accordion.component';
import {LectorListComponent} from './list/lector-list/lector-list.component';
import {PercentageTableComponent} from './table/percentage-table/percentage-table.component';
import {SECAccordionComponent} from './accordion/secaccordion/secaccordion.component';
import {LectorsAccordionService} from './accordion/lectors-accordion/lectors-accordion.service';

const entryComponents = [
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
  DepartmentFormComponent,
  DiplomWorkLectorsFormComponent,
  SelectSpecializationComponent,
  SelectDepartmentComponent,
  LectorCountDiplomFormComponent,
  SECNumberFormComponent,
  ChangePasswordFormComponent
];

const declarations = [
  ...entryComponents,
  NewsCardComponent,
  UserAccordionComponent,
  GroupTableComponent,
  SearchInputComponent,
  RoleTableComponent,
  SECTableComponent,
  SECRoleTableComponent,
  StatusTableComponent,
  LectorTableComponent,
  UniversityTableComponent,
  DepartmentTableComponent,
  SpecializationTableComponent,
  UserAvatarComponent,
  UserTableComponent,
  SECEventTableComponent,
  StudentTableComponent,
  LectorsAccordionComponent,
  LectorListComponent,
  PercentageTableComponent,
  SECAccordionComponent
];

@NgModule({
  imports: [
    CommonModule,
    AngularLibraryModule,
    MaterialDesignModule,
    BootstrapModule,
    DirectivesModule,
    StoragesModule,
    WorkersModule,
    Ej2Module,
    PrimeNGModule
  ],
  declarations,
  entryComponents,
  exports: [
    ...declarations
  ],
  providers: [
    LectorsAccordionService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ComponentsModule { }
