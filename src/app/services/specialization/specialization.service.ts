import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import {Group} from '../../factory/group.factory';
import {Specialization} from '../../factory/specialization.factory';

const prefix = 'specialization/';
@Injectable()
export class SpecializationService {

  constructor(public configService: ConfigService) { }

  getByDepartment(idFaculty) {
    return this.configService.get(prefix + 'get-by-department/' + idFaculty);
  }

  get(specialization) {
    return this.configService.get(prefix + 'specialization-' + specialization.idSpecialization);
  }
  getById(id) {
    return this.configService.get(prefix + 'specialization-' + id);
  }

  getAll() {
    return this.configService.get(prefix + 'getAll');
  }

  save(specialization) {
    return this.configService.post(prefix + 'save', specialization);
  }

  edit(specialization) {
    return this.configService.put(prefix + 'edit', specialization);
  }

  delete(specialization) {
    return this.configService.delete(prefix + 'delete-' + specialization.idSpecialization);
  }

  getPDF(specialization: Specialization) {
    console.log('prefix');
    const query = prefix + 'pdf-' + specialization.idSpecialization;
    return this.configService.blob(query);
  }

  getWord(specialization: Specialization) {
    console.log('prefix');
    const query = prefix + 'word-' + specialization.idSpecialization;
    return this.configService.blob(query);
  }

}
