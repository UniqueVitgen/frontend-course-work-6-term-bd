import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainComponent } from './pages/common/main/main.component';
import { AboutUsComponent } from './pages/common/about-us/about-us.component';
import { SignUpComponent } from './pages/common/sign-up/sign-up.component';
import { SignUpStudentComponent } from './pages/common/sign-up/sign-up-student/sign-up-student.component';
import { SignUpLectorComponent } from './pages/common/sign-up/sign-up-lector/sign-up-lector.component';
// import { SignInComponent } from './pages/common/sign-in/sign-in.component';

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
//form
// import { FacultyFormComponent } from './pages/admin/faculty-admin/faculty-form/faculty-form.component';
// import { SpecializationFormComponent } from './pages/admin/specialization-admin/specialization-form/specialization-form.component';
// import { GroupFormComponent } from './pages/admin/group-admin/group-form/group-form.component';

import { StudentGuard } from './guards/student/student.guard';
import { UnauthGuard } from './guards/unauth/unauth.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { AdminGuard } from './guards/admin/admin.guard';
import { StudentHasDiplomGuard } from './guards/student-has-diplom/student-has-diplom.guard';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './interceptor/interceptor';
import { NewsAdminComponent } from './pages/admin/news-admin/news-admin.component';
import { LeaderComponent } from './pages/lectors/leader/leader.component';
import { LectorGuard } from './guards/lector/lector.guard';
import { DiplomWorkComponent } from './pages/common/diplom-work/diplom-work.component';
import { DiplomWorkStudentComponent } from './pages/students/diplom-work-student/diplom-work-student.component';
import { QualificationAdminComponent } from './pages/admin/qualification-admin/qualification-admin.component';
import { DegreeAdminComponent } from './pages/admin/degree-admin/degree-admin.component';
import { PostAdminComponent } from './pages/admin/post-admin/post-admin.component';
import { TitleAdminComponent } from './pages/admin/title-admin/title-admin.component';
import { DiplomWorkAdminComponent } from './pages/admin/diplom-work-admin/diplom-work-admin.component';
import { UsersAdminComponent } from './pages/admin/users-admin/users-admin.component';
import { ProfileComponent } from './pages/common/profile/profile.component';
import { SignUpOrganizerComponent } from './pages/common/sign-up/sign-up-organizer/sign-up-organizer.component';
import { ExpectedRolesGuard } from './guards/expected-roles/expected-roles.guard';
import { SignUpSecretarySecComponent } from './pages/common/sign-up/sign-up-secretary-sec/sign-up-secretary-sec.component';
import { SECListComponent } from './pages/secretary/seclist/seclist.component';
import { SECComponent } from './pages/secretary/sec/sec.component';
import { NewsItemComponent } from './pages/common/news-item/news-item.component';
import { GroupItemComponent } from './pages/common/group-item/group-item.component';
import { GroupDashboardComponent } from './pages/common/group-dashboard/group-dashboard.component';
import { SECAdminComponent } from './pages/admin/secadmin/secadmin.component';
import { SECRoleAdminComponent } from './pages/admin/secrole-admin/secrole-admin.component';
import { StatusAdminComponent } from './pages/admin/status-admin/status-admin.component';
import { RoleAdminComponent } from './pages/admin/role-admin/role-admin.component';
import { UniversityAdminComponent } from './pages/admin/university-admin/university-admin.component';
import { DepartmentAdminComponent } from './pages/admin/department-admin/department-admin.component';
import { SignUpLectorOrganizerComponent } from './pages/common/sign-up/sign-up-lector-organizer/sign-up-lector-organizer.component';
import {LectorOrganizerComponent} from './pages/organizer/lector-organizer/lector-organizer.component';
import {SpecializationItemComponent} from './pages/common/specialization-item/specialization-item.component';

export const routes: Routes = [
  // { path: '',  redirectTo: 'home'},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainComponent, canActivate: [UnauthGuard],  },
  { path: 'registration', component: SignUpComponent, canActivate: [UnauthGuard] },
  { path: 'registration-student', component: SignUpStudentComponent, canActivate: [UnauthGuard] },
  { path: 'registration-lector', component: SignUpLectorComponent, canActivate: [UnauthGuard] },
  { path: 'registration-lector-organizer', component: SignUpLectorOrganizerComponent, canActivate: [UnauthGuard] },
  { path: 'registration-organizer', component: SignUpOrganizerComponent, canActivate: [UnauthGuard] },
  { path: 'registration-secretary-sec', component: SignUpSecretarySecComponent, canActivate: [UnauthGuard] },
  // { path: 'login', component: SignInComponent, canActivate: [UnauthGuard] },
  { path: 'diplom-work', canActivate: [StudentHasDiplomGuard], component: DiplomWorkStudentComponent },
  { path: 'diplom-work/:id', component: DiplomWorkComponent, canActivate: [AuthGuard] },
  { path: 'group/:id', component: GroupItemComponent, canActivate: [AuthGuard]},
  { path: 'specialization/:id', component: SpecializationItemComponent, canActivate: [AuthGuard]},
  { path: 'student-group', component: GroupItemComponent, canActivate: [AuthGuard]},

  { path: 'about-us', component: AboutUsComponent, canActivate: [AuthGuard] },
  { path: 'news', component: NewsComponent, canActivate:[AuthGuard]  },
  { path: 'groups', component: GroupDashboardComponent, canActivate: [AuthGuard]},

  { path: 'lector-staff', component: LectorStaffComponent, canActivate: [StudentGuard]  },
  { path: 'select-diplom', component: SelectDiplomComponent, canActivate:[StudentGuard]  },

  { path: 'query-students', component: QueryStudentsComponent, canActivate:[LectorGuard]  },
  { path: 'involve', component: LeaderComponent, canActivate:[LectorGuard]  },
  { path: 'percentage', component: PercentageComponent, canActivate:[LectorGuard]  },

  { path: 'user/:id', component: ProfileComponent, canActivate: [AuthGuard],  },
  { path: 'news/:id', component: NewsItemComponent  },

  { path: 'sec-list', component: SECListComponent, canActivate: [ExpectedRolesGuard],
  data: {
    expectedRoles: ['SECRETARY_SEC', 'ADMIN']
  }},
  { path: 'sec/:id', component: SECComponent, canActivate: [ExpectedRolesGuard], 
  data: {
    expectedRoles: ['SECRETARY_SEC', 'ADMIN']
  } },
  { path: 'organizer-lector', component: LectorOrganizerComponent, canActivate: [ExpectedRolesGuard], data: {
      expectedRoles: ['ADMIN', 'ORGANIZER', 'SECRETARY_SEC', 'LECTOR']
    }
    },
  { path: 'admin-university', component: UniversityAdminComponent, canActivate:[AdminGuard] },
  { path: 'admin-faculty', component: FacultyAdminComponent, canActivate:[AdminGuard] },
  { path: 'admin-department', component: DepartmentAdminComponent, canActivate:[AdminGuard] },
  { path: 'admin-specialization', component: SpecializationAdminComponent, canActivate:[ExpectedRolesGuard] , data: {
      expectedRoles: ['ADMIN', 'ORGANIZER', 'SECRETARY_SEC']
    }   },
  { path: 'admin-group', component: GroupAdminComponent, canActivate: [AdminGuard]  },
  { path: 'admin-news', component: NewsAdminComponent, canActivate: [ExpectedRolesGuard], data: {
    expectedRoles: ['ADMIN', 'ORGANIZER', 'SECRETARY_SEC', 'LECTOR']
  }   },
  { path: 'admin-degree', component: DegreeAdminComponent, canActivate: [AdminGuard]  },
  { path: 'admin-post', component: PostAdminComponent, canActivate: [AdminGuard]  },
  { path: 'admin-title', component: TitleAdminComponent, canActivate: [AdminGuard]  },
  { path: 'admin-diplom-work', component: DiplomWorkAdminComponent, canActivate: [ExpectedRolesGuard], data: {
    expectedRoles: ['ADMIN', 'ORGANIZER', 'SECRETARY_SEC']
  }  },
  { path: 'admin-sec', component: SECAdminComponent, canActivate: [ExpectedRolesGuard], data: {
    expectedRoles: ['ADMIN', 'ORGANIZER', 'SECRETARY_SEC']
  }  },
  { path: 'admin-sec-role', component: SECRoleAdminComponent, canActivate: [ExpectedRolesGuard], data: {
    expectedRoles: ['ADMIN', 'ORGANIZER', 'SECRETARY_SEC']
  }  },
  { path: 'admin-status', component: StatusAdminComponent, canActivate: [ExpectedRolesGuard], data: {
    expectedRoles: ['ADMIN', 'ORGANIZER', 'SECRETARY_SEC']
  }  },
  { path: 'admin-role', component: RoleAdminComponent, canActivate: [ExpectedRolesGuard], data: {
    expectedRoles: ['ADMIN']
  }  },
  { path: 'admin-users', component: UsersAdminComponent, canActivate: [AdminGuard]  },
  { path: 'admin-qualifications', component: QualificationAdminComponent, canActivate: [AdminGuard]  },
  // { path: 'new-faculty', component: FacultyFormComponent, canActivate:[AdminGuard] },
  // { path: 'new-specialization', component: SpecializationFormComponent, canActivate:[AdminGuard]  },
  // { path: 'new-group', component: GroupFormComponent, canActivate: [AdminGuard]  },
  // { path: 'edit-faculty/:id', component: FacultyFormComponent, canActivate:[AdminGuard] },
  // { path: 'edit-specialization/:id', component: SpecializationFormComponent, canActivate:[AdminGuard]  },
  // { path: 'edit-group/:id', component: GroupFormComponent, canActivate: [AdminGuard]  },

];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
