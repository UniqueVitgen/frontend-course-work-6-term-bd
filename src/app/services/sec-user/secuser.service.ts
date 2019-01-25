import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { SECUser } from '../../factory/user.factory';

const prefix = 'sec-user/';
@Injectable({
  providedIn: 'root'
})
export class SECUserService {

  constructor(
    private configService: ConfigService) { }

  getAll() {
    return this.configService.get(prefix + 'getAll');
  }

  save(degree: SECUser) {
    return this.configService.post(prefix + 'save', degree);
  }

  saveBySec(sec, secUser: SECUser) {
    return this.configService.post(prefix + 'save-' + sec.id, secUser);
  }

  edit(degree) {
    return this.configService.put(prefix + 'edit', degree);
  }

  delete(degree) {
    return this.configService.delete(prefix + 'delete-' + degree.id);
  }

}
