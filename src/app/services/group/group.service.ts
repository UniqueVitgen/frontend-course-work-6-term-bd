import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Group } from '../../factory/group.factory';
import { Observable } from 'rxjs';

const prefix = 'group/';
@Injectable()
export class GroupService {

  constructor(public configService: ConfigService) { }

  getAllBySpecializationId(specializationId) {
    return this.configService.get(prefix + 'get-by-specialization/'+ specializationId);
  }

  getAllByGroupId(groupId) {
    return this.configService.get(prefix + 'find-all-student?idGroup='+ groupId);
  }

  get(group) {
    return this.configService.get(prefix + 'group-' + group.idGroup);
  }
  getById(id): Observable<Group> {
    return this.configService.get(prefix + 'group-' + id);
  }

  getAll() {
    return this.configService.get(prefix + 'getAll');
  }

  save(group) {
    return this.configService.post(prefix + 'save', group);
  }

  edit(group) {
    return this.configService.put(prefix + 'edit', group);
  }

  delete(group) {
    return this.configService.delete(prefix + 'delete-' + group.idGroup);
  }

  findAllBySecInOrNull(secList) {
    let ids = secList.map((sec) => {
      return sec.id;
    });
    let query = prefix + 'find-all-by-sec-or-null';
    for(let i = 0; i < ids.length; i++) {
      if(i == 0) {
        query += '?secIds=' + ids[i];
      }
      else {
        query += '&secIds=' + ids[i];
      }
    }
    return this.configService.get(query);
  }

  findAllBySecIsNull() {
    let query = prefix + 'find-all-by-where-sec-is-null';
    return this.configService.get(query);
  }

  getPDF(group: Group) {
    console.log('prefix');
    let query = prefix + 'pdf-' + group.idGroup;
   return this.configService.blob(query);
  }

  getWord(group: Group) {
    console.log('prefix');
    let query = prefix + 'word-' + group.idGroup;
   return this.configService.blob(query);
  }

}
