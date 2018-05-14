import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(public configService: ConfigService) {

  }

  attemptAuth(ussername: string, password: string) {
    const credentials = {username: ussername, password: password};
    console.log('attempAuth ::');
    return this.configService.post('token/generate-token', credentials);
  }

}
