import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { AngularLibraryModule } from '../../library/angular-library/angular-library.module';
import { MaterialDesignModule } from '../../library/material-design/material-design.module';
import { ComponentsModule } from '../../components/components.module';
import { StudentModule } from '../student/student.module';
import { BootstrapModule } from '../../library/bootstrap/bootstrap.module';
import { StoragesModule } from '../../others/storages/storages.module';
import { WorkersModule } from '../../others/workers/workers.module';
import { GroupDashboardComponent } from '../../../pages/common/group-dashboard/group-dashboard.component';
import { SignUpLectorOrganizerComponent } from '../../../pages/common/sign-up/sign-up-lector-organizer/sign-up-lector-organizer.component';

@NgModule({
  imports: [
    CommonModule,
    AngularLibraryModule,
    MaterialDesignModule,
    BootstrapModule,
    ComponentsModule,
    StudentModule,
    StoragesModule,
    WorkersModule
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
    SignUpLectorOrganizerComponent,
    ProfileComponent,
    SignUpOrganizerComponent,
    NewsItemComponent,
    GroupItemComponent,
    GroupDashboardComponent
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
    SignUpLectorOrganizerComponent,
    ProfileComponent,
    SignUpOrganizerComponent,
    NewsItemComponent,
    GroupItemComponent,
    MainComponent,
    GroupDashboardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CommonPagesModule { }
