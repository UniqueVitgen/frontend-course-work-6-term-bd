import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SignUpOrganizerComponent } from './sign-up/sign-up-organizer/sign-up-organizer.component';
import { SignUpSecretarySecComponent } from './sign-up/sign-up-secretary-sec/sign-up-secretary-sec.component';
import { GroupItemComponent } from './group-item/group-item.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { MainComponent } from './main/main.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpStudentComponent } from './sign-up/sign-up-student/sign-up-student.component';
import { SignUpLectorComponent } from './sign-up/sign-up-lector/sign-up-lector.component';
import { DiplomLectorStaffComponent } from './diplom-lector-staff/diplom-lector-staff.component';
import { AngularLibraryModule } from '../../modules/library/angular-library/angular-library.module';
import { MaterialDesignModule } from '../../modules/library/material-design/material-design.module';
import { ComponentsModule } from '../../components/components.module';
import { StudentModule } from '../students/student.module';
import { BootstrapModule } from '../../modules/library/bootstrap/bootstrap.module';
import { StoragesModule } from '../../storage/storages.module';
import { WorkersModule } from '../../workers/workers.module';
import { GroupDashboardComponent } from './group-dashboard/group-dashboard.component';
import { SignUpLectorOrganizerComponent } from './sign-up/sign-up-lector-organizer/sign-up-lector-organizer.component';
import {SpecializationItemComponent} from './specialization-item/specialization-item.component';
import {DepartmentItemComponent} from './department-item/department-item.component';
import {PrimeNGModule} from '../../modules/library/prime-ng/prime-ng.module';
import {DiplomWorkModule} from './diplom-work/diplom-work.module';

@NgModule({
  imports: [
    CommonModule,
    AngularLibraryModule,
    MaterialDesignModule,
    PrimeNGModule,
    BootstrapModule,
    ComponentsModule,
    StudentModule,
    StoragesModule,
    WorkersModule,
    DiplomWorkModule
  ],
  declarations: [
    MainComponent,
    AboutUsComponent,
    SignUpComponent,
    SignUpStudentComponent,
    SignUpLectorComponent,
    DiplomLectorStaffComponent,
    SignUpSecretarySecComponent,
    SignUpLectorOrganizerComponent,
    ProfileComponent,
    SignUpOrganizerComponent,
    NewsItemComponent,
    GroupItemComponent,
    SpecializationItemComponent,
    GroupDashboardComponent,
    DepartmentItemComponent
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
    DiplomLectorStaffComponent,
    SignUpSecretarySecComponent,
    SignUpLectorOrganizerComponent,
    ProfileComponent,
    SignUpOrganizerComponent,
    NewsItemComponent,
    GroupItemComponent,
    MainComponent,
    SpecializationItemComponent,
    GroupDashboardComponent,
    DepartmentItemComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CommonPagesModule { }
