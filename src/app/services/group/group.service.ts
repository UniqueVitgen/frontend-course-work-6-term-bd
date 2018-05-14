import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

const prefix = 'group/';
@Injectable()
export class GroupService {

  constructor(public configService: ConfigService) { }

  getAllBySpecializationId(specializationId) {
    return this.configService.get(prefix + 'get-by-specialization/'+ specializationId);
  }

  getAllByGroupId(groupId) {
    return this.configService.get(prefix + 'get-by-group/'+ groupId);
  }

  get(group) {
    return this.configService.get(prefix + 'group-' + group.idGroup);
  }
  getById(id) {
    return this.configService.get(prefix + 'group-' + id);
  }

  getAll() {
    return this.configService.get(prefix + 'getAll');
  }

  save(group) {
    return this.configService.post(prefix + 'save', group);
  }

  edit(group) {
    return this.configService.put(prefix + "edit", group);
  }

  delete(group) {
    return this.configService.delete(prefix + 'delete-' + group.idGroup);
  }

}
