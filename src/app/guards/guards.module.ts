import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentGuard } from './student/student.guard';
import { UnauthGuard } from './unauth/unauth.guard';
import { AuthGuard } from './auth/auth.guard';
import { LectorGuard } from './lector/lector.guard';
import { AdminGuard } from './admin/admin.guard';
import { StudentHasDiplomGuard } from './student-has-diplom/student-has-diplom.guard';
import { ExpectedRolesGuard } from './expected-roles/expected-roles.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    StudentGuard,
    UnauthGuard,
    AuthGuard,
    LectorGuard,
    AdminGuard,
    StudentHasDiplomGuard,
    ExpectedRolesGuard
  ],
  declarations: []
})
export class GuardsModule { }
