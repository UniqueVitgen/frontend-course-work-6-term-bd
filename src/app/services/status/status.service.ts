import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Status } from '../../factory/status.factory';

const prefix = 'status/';
@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(public configService: ConfigService) { }

  getAll() {
    return this.configService.get(prefix + 'getAll');
  }

  getById(id) {
    return this.configService.get(prefix + 'status-' + id);
  }

  get(status: Status) {
    return this.configService.get(prefix + 'status-' + status.id);
  }

  save(status) {
    return this.configService.post(prefix + 'save', status);
  }

  edit(status) {
    return this.configService.put(prefix + "edit", status);
  }

  delete(status: Status) {
    return this.configService.delete(prefix + 'delete-' + status.id);
  }

}
