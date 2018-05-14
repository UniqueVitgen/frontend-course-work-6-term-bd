import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BsModalModule } from 'ng2-bs3-modal';
import { HttpModule, XHRBackend, RequestOptions, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { httpFactory } from './interceptor/http.factory';
import { ModalModule } from 'ngx-bootstrap/modal';

import { MainComponent } from './pages/common/main/main.component';
import { AboutUsComponent } from './pages/common/about-us/about-us.component';
import { SignUpComponent } from './pages/common/sign-up/sign-up.component';
import { SignUpStudentComponent } from './pages/common/sign-up/sign-up-student/sign-up-student.component';
import { SignUpLectorComponent } from './pages/common/sign-up/sign-up-lector/sign-up-lector.component';

import { SelectDiplomComponent } from './pages/students/select-diplom/select-diplom.component';
import { SelectTeacherComponent } from './pages/students/select-teacher/select-teacher.component';
import { LectorStaffComponent } from './pages/students/lector-staff/lector-staff.component';
import { NewsComponent } from './pages/students/news/news.component';

import { InvolveComponent } from './pages/lectors/involve/involve.component';
import { PercentageComponent } from './pages/lectors/percentage/percentage.component';
import { QueryStudentsComponent } from './pages/lectors/query-students/query-students.component';

import { FacultyAdminComponent } from './pages/admin/faculty-admin/faculty-admin.component';
import { SpecializationAdminComponent } from './pages/admin/specialization-admin/specialization-admin.component';
import { GroupAdminComponent } from './pages/admin/group-admin/group-admin.component';
import { LectorAdminComponent } from './pages/admin/lector-admin/lector-admin.component';
import { StudentAdminComponent } from './pages/admin/student-admin/student-admin.component';
import { NewsAdminComponent } from './pages/admin/news-admin/news-admin.component';
import { TitleAdminComponent } from './pages/admin/title-admin/title-admin.component';
import { PostAdminComponent } from './pages/admin/post-admin/post-admin.component';
import { DegreeAdminComponent } from './pages/admin/degree-admin/degree-admin.component';
//form
import { FacultyFormComponent } from './components/forms/faculty-form/faculty-form.component';
import { SpecializationFormComponent } from './components/forms/specialization-form/specialization-form.component';
import { GroupFormComponent } from './components/forms/group-form/group-form.component';
import { NewsFormComponent } from './components/forms/news-form/news-form.component';
import { TitleFormComponent } from './components/forms/title-form/title-form.component';
import { DegreeFormComponent } from './components/forms/degree-form/degree-form.component';
import { PostFormComponent } from './components/forms/post-form/post-form.component';
import { SignInComponent } from './components/forms/sign-in/sign-in.component';

import { SelectLectorComponent } from './components/select/select-lector/select-lector.component';

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

import { StudentGuard } from './guards/student/student.guard';
import { UnauthGuard } from './guards/unauth/unauth.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { LectorGuard } from './guards/lector/lector.guard';
import { AdminGuard } from './guards/admin/admin.guard';

import { TokenStorage } from './storage/token/TokenStorage';
import { UserStorage } from './storage/user/UserStorage';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './interceptor/interceptor';

import { PasswordValidator } from './validators/password.validator';

import { routes } from './app-routing.module';

import * as $ from 'jquery';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutUsComponent,
    SignUpComponent,
    SignInComponent,
    SelectDiplomComponent,
    SelectTeacherComponent,
    LectorStaffComponent,
    NewsComponent,
    SignUpStudentComponent,
    SignUpLectorComponent,
    QueryStudentsComponent,
    InvolveComponent,
    PercentageComponent,
    FacultyAdminComponent,
    SpecializationAdminComponent,
    GroupAdminComponent,
    LectorAdminComponent,
    StudentAdminComponent,
    FacultyFormComponent,
    SpecializationFormComponent,
    GroupFormComponent,
    NewsFormComponent,
    NewsAdminComponent,
    TitleAdminComponent,
    TitleFormComponent,
    DegreeFormComponent,
    DegreeAdminComponent,
    PostAdminComponent,
    PostFormComponent,
    SelectLectorComponent,
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    BsModalModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    // RouterModule.forRoot(routes),
    AppRoutingModule
  ],
  entryComponents: [
    SignInComponent,
    SelectLectorComponent,
    FacultyFormComponent,
    SpecializationFormComponent,
    GroupFormComponent,
  ],
  providers: [
    CommonModule,
    MainComponent,

    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: Interceptor,
    //   multi: true
    // },

    GlobalEventsService,
    FormEventService,  
    // ModalService,
    LectorService,
    TitleService,
    PostService,
    DegreeService,
    UserService,
    RoleService,
    ConfigService,
    LectorService,
    NewsService,
    FacultyService,
    SpecializationService,
    GroupService,
    SignUpService,
    AuthService,

    StudentGuard,
    UnauthGuard,
    AuthGuard,
    LectorGuard,
    AdminGuard,
    // SignInComponent,

    // PasswordValidator,

    TokenStorage,
    UserStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
