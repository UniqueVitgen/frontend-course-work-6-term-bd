import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import 'rxjs/add/operator/map';

const prefix = 'sign-up/';
@Injectable()
export class SignUpService {

  constructor(
    private configService: ConfigService
  ) { }

  signUpStudent(student) {
    return this.configService.post(prefix + 'student', student);
  }

  signUpLector(lector) {
    return this.configService.post(prefix + 'lector', lector);
  }

  singUpOrganizer(organizer) {
    return this.configService.post(prefix + 'organizer', organizer);
  }

  singUpSecretary(secretary) {
    return this.configService.post(prefix + 'secretary-sec', secretary);
  }

}
