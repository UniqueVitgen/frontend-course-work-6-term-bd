import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Role } from '../../factory/role.factory';

const prefix = 'roles/';
@Injectable()
export class RoleService {

  constructor(
    private configService: ConfigService) { 

    }

    getRoles() {
      return this.configService.get(prefix + 'getAll');
    }

    save(role) {
      return this.configService.post(prefix + 'save', role);
    }
 
    edit(role) {
      return this.configService.put(prefix + "edit", role);
    }

    delete(role: Role) {
      return this.configService.delete(prefix + 'delete-' + role.id_Role);
    }

}
