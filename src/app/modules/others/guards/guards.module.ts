import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentGuard } from '../../../guards/student/student.guard';
import { UnauthGuard } from '../../../guards/unauth/unauth.guard';
import { AuthGuard } from '../../../guards/auth/auth.guard';
import { LectorGuard } from '../../../guards/lector/lector.guard';
import { AdminGuard } from '../../../guards/admin/admin.guard';
import { StudentHasDiplomGuard } from '../../../guards/student-has-diplom/student-has-diplom.guard';
import { ExpectedRolesGuard } from '../../../guards/expected-roles/expected-roles.guard';

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
