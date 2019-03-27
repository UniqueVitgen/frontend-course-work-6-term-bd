import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalEventsService } from './events/global/global-events.service';
import { FormEventService } from './events/form/form-event.service';
import { LectorService } from './lector-service/lector.service';
import { TitleService } from './title/title.service';
import { PostService } from './post/post.service';
import { DegreeService } from './degree/degree.service';
import { UserService } from './user-service/user.service';
import { RoleService } from './role/role.service';
import { ConfigService } from './config/config.service';
import { NewsService } from './news-service/news.service';
import { FacultyService } from './faculty/faculty.service';
import { SpecializationService } from './specialization/specialization.service';
import { GroupService } from './group/group.service';
import { SignUpService } from './sign-up/sign-up.service';
import { AuthService } from './auth/auth.service';
import { UploadFileService } from './upload-file/upload-file.service';
import { DiplomWorkService } from './diplom-work/diplom-work.service';
import { PercentageService } from './percentage/percentage.service';
import { QualificationService } from './qualification/qualification.service';
import { StatusService } from './status/status.service';
import { SECService } from './sec/sec.service';
import { SECEventService } from './sec-event/secevent.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
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
    UploadFileService,
    DiplomWorkService,
    PercentageService,
    QualificationService,
    StatusService,
    SECService,
    SECEventService,
  ],
  declarations: []
})
export class ServicesModule { }
