import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalEventsService } from '../../../services/events/global/global-events.service';
import { FormEventService } from '../../../services/events/form/form-event.service';
import { LectorService } from '../../../services/lector-service/lector.service';
import { TitleService } from '../../../services/title/title.service';
import { PostService } from '../../../services/post/post.service';
import { DegreeService } from '../../../services/degree/degree.service';
import { UserService } from '../../../services/user-service/user.service';
import { RoleService } from '../../../services/role/role.service';
import { ConfigService } from '../../../services/config/config.service';
import { NewsService } from '../../../services/news-service/news.service';
import { FacultyService } from '../../../services/faculty/faculty.service';
import { SpecializationService } from '../../../services/specialization/specialization.service';
import { GroupService } from '../../../services/group/group.service';
import { SignUpService } from '../../../services/sign-up/sign-up.service';
import { AuthService } from '../../../services/auth/auth.service';
import { UploadFileService } from '../../../services/upload-file/upload-file.service';
import { DiplomWorkService } from '../../../services/diplom-work/diplom-work.service';
import { PercentageService } from '../../../services/percentage/percentage.service';
import { QualificationService } from '../../../services/qualification/qualification.service';
import { StatusService } from '../../../services/status/status.service';
import { SECService } from '../../../services/sec/sec.service';
import { SECEventService } from '../../../services/sec-event/secevent.service';

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
