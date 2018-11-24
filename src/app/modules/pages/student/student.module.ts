import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDiplomComponent } from '../../../pages/students/select-diplom/select-diplom.component';
import { SelectTeacherComponent } from '../../../pages/students/select-teacher/select-teacher.component';
import { LectorStaffComponent } from '../../../pages/students/lector-staff/lector-staff.component';
import { NewsComponent } from '../../../pages/students/news/news.component';
import { DiplomWorkStudentComponent } from '../../../pages/students/diplom-work-student/diplom-work-student.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SelectDiplomComponent,
    SelectTeacherComponent,
    LectorStaffComponent,
    NewsComponent,
    DiplomWorkStudentComponent
  ]
})
export class StudentModule { }
