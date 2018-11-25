import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../../../pages/common/profile/profile.component';
import { SignUpOrganizerComponent } from '../../../pages/common/sign-up/sign-up-organizer/sign-up-organizer.component';
import { SignUpSecretarySecComponent } from '../../../pages/common/sign-up/sign-up-secretary-sec/sign-up-secretary-sec.component';
import { GroupItemComponent } from '../../../pages/common/group-item/group-item.component';
import { NewsItemComponent } from '../../../pages/common/news-item/news-item.component';
import { MainComponent } from '../../../pages/common/main/main.component';
import { AboutUsComponent } from '../../../pages/common/about-us/about-us.component';
import { SignUpComponent } from '../../../pages/common/sign-up/sign-up.component';
import { SignUpStudentComponent } from '../../../pages/common/sign-up/sign-up-student/sign-up-student.component';
import { SignUpLectorComponent } from '../../../pages/common/sign-up/sign-up-lector/sign-up-lector.component';
import { DiplomWorkComponent } from '../../../pages/common/diplom-work/diplom-work.component';
import { DiplomLectorStaffComponent } from '../../../pages/common/diplom-lector-staff/diplom-lector-staff.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MainComponent,
    AboutUsComponent,
    SignUpComponent,
    SignUpStudentComponent,
    SignUpLectorComponent,
    DiplomWorkComponent,
    DiplomLectorStaffComponent,
    SignUpSecretarySecComponent,
    ProfileComponent,
    SignUpOrganizerComponent,
    NewsItemComponent,
    GroupItemComponent
  ],
  providers: [
    MainComponent
  ],
  exports: [
    MainComponent,
    AboutUsComponent,
    SignUpComponent,
    SignUpStudentComponent,
    SignUpLectorComponent,
    DiplomWorkComponent,
    DiplomLectorStaffComponent,
    SignUpSecretarySecComponent,
    ProfileComponent,
    SignUpOrganizerComponent,
    NewsItemComponent,
    GroupItemComponent,
    MainComponent
  ]
})
export class CommonPagesModule { }
