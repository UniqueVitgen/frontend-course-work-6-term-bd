import { Injectable } from '@angular/core';

import { ConfigService } from '../config/config.service';
import 'rxjs/add/operator/map';

const TOKEN_KEY = 'AuthToken';
const prefix = 'users/';
@Injectable()
export class UserService {

  constructor(
    private configService: ConfigService) { }

    getUsers() {
      return this.configService.get(prefix+'getAll');
    }

    getByUsername(username) {
      return this.configService.get(prefix+'user-username/'+username);
    }

    getById(id) {
      return this.configService.get(prefix+'user-' + id);
    }

    getAll() {
      return this.configService.get(prefix+'getAll');

    }

}
