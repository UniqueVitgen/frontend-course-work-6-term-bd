import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

const prefix = 'roles/';
@Injectable()
export class RoleService {

  constructor(
    private configService: ConfigService) { 

    }

    getRoles() {
      return this.configService.get(prefix + 'getAll');
    }

}
