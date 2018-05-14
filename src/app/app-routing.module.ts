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

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './interceptor/interceptor';

export const routes: Routes = [
  // { path: '',  redirectTo: 'home'},
  { path: 'home', component: MainComponent, canActivate: [UnauthGuard],  },
  { path: 'registration', component: SignUpComponent, canActivate: [UnauthGuard] },
  { path: 'registration-student', component: SignUpStudentComponent, canActivate: [UnauthGuard] },
  { path: 'registration-lector', component: SignUpLectorComponent, canActivate: [UnauthGuard] },
  // { path: 'login', component: SignInComponent, canActivate: [UnauthGuard] },

  { path: 'about-us', component: AboutUsComponent, canActivate: [AuthGuard] },
  { path: 'news', component: NewsComponent, canActivate:[AuthGuard]  },

  { path: 'lector-staff', component: LectorStaffComponent, canActivate: [StudentGuard]  },
  { path: 'select-diplom', component: SelectDiplomComponent, canActivate:[StudentGuard]  },

  { path: 'query-students', component: QueryStudentsComponent, canActivate:[StudentGuard]  },
  { path: 'involve', component: InvolveComponent, canActivate:[StudentGuard]  },
  { path: 'percentage', component: PercentageComponent, canActivate:[StudentGuard]  },
  
  { path: 'admin-faculty', component: FacultyAdminComponent, canActivate:[AdminGuard] },
  { path: 'admin-specialization', component: SpecializationAdminComponent, canActivate:[AdminGuard]  },
  { path: 'admin-group', component: GroupAdminComponent, canActivate: [AdminGuard]  },
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
  ],
  declarations: []
})
export class AppRoutingModule { }
