import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgControl } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule, XHRBackend, RequestOptions, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { httpFactory } from './interceptor/http.factory';
import { Ng2FileInputModule } from 'ng2-file-input'; // <-- import the module
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule, MatCommonModule, MatTableModule, MatIconModule, MatCheckboxModule, MatMenuModule} from '@angular/material';

// import { MainComponent } from './pages/common/main/main.component';
// import { AboutUsComponent } from './pages/common/about-us/about-us.component';
// import { SignUpComponent } from './pages/common/sign-up/sign-up.component';
// import { SignUpStudentComponent } from './pages/common/sign-up/sign-up-student/sign-up-student.component';
// import { SignUpLectorComponent } from './pages/common/sign-up/sign-up-lector/sign-up-lector.component';
// import { DiplomWorkComponent } from './pages/common/diplom-work/diplom-work.component';
// import { DiplomLectorStaffComponent } from './pages/common/diplom-lector-staff/diplom-lector-staff.component';

import { SelectDiplomComponent } from './pages/students/select-diplom/select-diplom.component';
import { SelectTeacherComponent } from './pages/students/select-teacher/select-teacher.component';
import { LectorStaffComponent } from './pages/students/lector-staff/lector-staff.component';
import { NewsComponent } from './pages/students/news/news.component';
import { DiplomWorkStudentComponent } from './pages/students/diplom-work-student/diplom-work-student.component';

import { InvolveComponent } from './pages/lectors/involve/involve.component';
import { PercentageComponent } from './pages/lectors/percentage/percentage.component';
import { QueryStudentsComponent } from './pages/lectors/query-students/query-students.component';
import { LeaderComponent } from './pages/lectors/leader/leader.component';
import { PercentageControlComponent } from './pages/lectors/percentage-control/percentage-control.component';

// import { FacultyAdminComponent } from './pages/admin/faculty-admin/faculty-admin.component';
// import { SpecializationAdminComponent } from './pages/admin/specialization-admin/specialization-admin.component';
// import { GroupAdminComponent } from './pages/admin/group-admin/group-admin.component';
// import { LectorAdminComponent } from './pages/admin/lector-admin/lector-admin.component';
// import { StudentAdminComponent } from './pages/admin/student-admin/student-admin.component';
// import { NewsAdminComponent } from './pages/admin/news-admin/news-admin.component';
// import { TitleAdminComponent } from './pages/admin/title-admin/title-admin.component';
// import { PostAdminComponent } from './pages/admin/post-admin/post-admin.component';
// import { DegreeAdminComponent } from './pages/admin/degree-admin/degree-admin.component';
// import { QualificationAdminComponent } from './pages/admin/qualification-admin/qualification-admin.component';
//form
// import { FacultyFormComponent } from './components/forms/faculty-form/faculty-form.component';
// import { SpecializationFormComponent } from './components/forms/specialization-form/specialization-form.component';
// import { GroupFormComponent } from './components/forms/group-form/group-form.component';
// import { NewsFormComponent } from './components/forms/news-form/news-form.component';
// import { TitleFormComponent } from './components/forms/title-form/title-form.component';
// import { DegreeFormComponent } from './components/forms/degree-form/degree-form.component';
// import { PostFormComponent } from './components/forms/post-form/post-form.component';
// import { SignInComponent } from './components/forms/sign-in/sign-in.component';
// import { PercentageFormComponent } from './components/forms/percentage-form/percentage-form.component';
// import { QualificationFormComponent } from './components/forms/qualification-form/qualification-form.component';

// import { SelectLectorComponent } from './components/select/select-lector/select-lector.component';
// import { FileUploadComponent } from './components/file/file-upload/file-upload.component';
// import { SelectImageComponent } from './components/select/select-image/select-image.component';


import { UploadFileService } from './services/upload-file/upload-file.service';
import { GlobalEventsService } from './services/events/global/global-events.service';
import { FormEventService } from './services/events/form/form-event.service';

import { LectorService } from './services/lector-service/lector.service';
import { UserService } from './services/user-service/user.service';

import { TitleService } from './services/title/title.service';
import { DegreeService } from './services/degree/degree.service';
import { PostService } from './services/post/post.service';

import { RoleService } from './services/role/role.service';
import { ConfigService } from './services/config/config.service';
import { NewsService } from './services/news-service/news.service';
import { FacultyService } from './services/faculty/faculty.service';
import { SpecializationService } from './services/specialization/specialization.service';
import { GroupService } from './services/group/group.service';
import { AuthService } from './services/auth/auth.service';
import { SignUpService } from './services/sign-up/sign-up.service';
import { DiplomWorkService } from './services/diplom-work/diplom-work.service';
import { PercentageService } from './services/percentage/percentage.service';
import { QualificationService } from './services/qualification/qualification.service';

import { StudentGuard } from './guards/student/student.guard';
import { UnauthGuard } from './guards/unauth/unauth.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { LectorGuard } from './guards/lector/lector.guard';
import { AdminGuard } from './guards/admin/admin.guard';
import { StudentHasDiplomGuard } from './guards/student-has-diplom/student-has-diplom.guard';

import { TokenStorage } from './storage/token/TokenStorage';
import { UserStorage } from './storage/user/UserStorage';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { Interceptor } from './interceptor/interceptor';

import { DateTimeWorker } from  './workers/DateTimeWorker';

import { PasswordValidator } from './validators/password.validator';

import { DisableControlDirective } from './directives/disable-control/disable-control.directive';
import { PercentDirective } from './directives/percent/percent.directive';

import { PercentPipe } from '@angular/common';

import { routes } from './app-routing.module';

import * as $ from 'jquery';
// import { DiplomWorkAdminComponent } from './pages/admin/diplom-work-admin/diplom-work-admin.component';
// import { UsersAdminComponent } from './pages/admin/users-admin/users-admin.component';
// import { ProfileComponent } from './pages/common/profile/profile.component';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { TooltipModule } from 'ngx-bootstrap';
import { StatusService } from './services/status/status.service';
// import { SignUpOrganizerComponent } from './pages/common/sign-up/sign-up-organizer/sign-up-organizer.component';
import { ExpectedRolesGuard } from './guards/expected-roles/expected-roles.guard';
// import { DiplomWorkTitleFormComponent } from './components/forms/diplom-work-title-form/diplom-work-title-form.component';
// import { SignUpSecretarySecComponent } from './pages/common/sign-up/sign-up-secretary-sec/sign-up-secretary-sec.component';
import { SECListComponent } from './pages/secretary/seclist/seclist.component';
import { SECService } from './services/sec/sec.service';
import { SECEventService } from './services/sec-event/secevent.service';
// import { SECFormComponent } from './components/forms/secform/secform.component';
// import { SECEventFormComponent } from './components/forms/secevent-form/secevent-form.component';
// import { SelectGroupComponent } from './components/select/select-group/select-group.component';
import { ArrayWorker } from './workers/ArrayWorker';
import { TimepickerModule } from 'ngx-bootstrap';
import { SECComponent } from './pages/secretary/sec/sec.component';
// import { SECUserFormComponent } from './components/forms/secuser-form/secuser-form.component';
import { UserWorker } from './workers/UserWorker';
// import { SECRoleFormComponent } from './components/forms/secrole-form/secrole-form.component';
// import { NewsItemComponent } from './pages/common/news-item/news-item.component';
// import { NewsCardComponent } from './components/card/news-card/news-card.component';
// import { SECDateFormComponent } from './components/forms/secdate-form/secdate-form.component';
import { AdminModule } from './modules/pages/admin/admin.module';
import { CommonPagesModule } from './modules/pages/common-pages/common-pages.module';
import { LectorModule } from './modules/pages/lector/lector.module';
import { SecretaryModule } from './modules/pages/secretary/secretary.module';
import { StudentModule } from './modules/pages/student/student.module';
import { ComponentsModule } from './modules/components/components.module';
import { DirectivesModule } from './modules/others/directives/directives.module';
import { AngularLibraryModule } from './modules/library/angular-library/angular-library.module';
import { BootstrapModule } from './modules/library/bootstrap/bootstrap.module';
import { MaterialDesignModule } from './modules/library/material-design/material-design.module';
import { PipesModule } from './modules/others/pipes/pipes.module';
import { StoragesModule } from './modules/others/storages/storages.module';
import { WorkersModule } from './modules/others/workers/workers.module';
import { ServicesModule } from './modules/others/services/services.module';
import { GuardsModule } from './modules/others/guards/guards.module';
import { DiplomWorkLectorsFormComponent } from './components/forms/diplom-work-lectors-form/diplom-work-lectors-form.component';
import { SelectSecretaryComponent } from './components/select/select-secretary/select-secretary.component';
import { LectorTableComponent } from './components/table/lector-table/lector-table.component';
import { LectorOrganizerComponent } from './pages/organizer/lector-organizer/lector-organizer.component';
import {OrganizerModule} from './modules/pages/organizer/organizer.module';
import { LectorCountDiplomFormComponent } from './components/forms/lector-count-diplom-form/lector-count-diplom-form.component';
import { SpecializationTableComponent } from './components/table/specialization-table/specialization-table.component';
import { SpecializationItemComponent } from './pages/common/specialization-item/specialization-item.component';
import { SelectSpecializationComponent } from './components/select/select-specialization/select-specialization.component';
import { SelectDepartmentComponent } from './components/select/select-department/select-department.component';
import {Ej2Module} from './modules/library/ej2/ej2.module';
import { UserAvatarComponent } from './components/avatar/user-avatar/user-avatar.component';
import { UserTableComponent } from './components/table/user-table/user-table.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    AngularLibraryModule,
    BootstrapModule,
    MaterialDesignModule,

    AdminModule,
    CommonPagesModule,
    LectorModule,
    SecretaryModule,
    StudentModule,
    ComponentsModule,
    OrganizerModule,

    DirectivesModule,
    StoragesModule,
    WorkersModule,
    PipesModule,
    GuardsModule,
    ServicesModule,
    Ej2Module
  ],
  entryComponents: [
  ],
  providers: [
    CommonModule,
    // MainComponent,
    FormsModule,

    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {

}
