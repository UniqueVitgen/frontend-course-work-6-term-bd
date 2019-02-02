import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Department } from '../../factory/department.factory';
import { Faculty } from '../../factory/faculty.factory';
import {Specialization} from '../../factory/specialization.factory';

const prefix = 'department/';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {


  constructor(public configService: ConfigService) {

  }
  get(department: Department) {
    return this.configService.get(prefix + 'department-' + department.id);
  }
  getById(id) {
    return this.configService.get(prefix + 'department-' + id);
  }

  getAll() {
    return this.configService.get(prefix + 'getAll');
  }

  getAllByFaculty(faculty: Faculty) {
    return this.configService.get(prefix + 'findAll-by-department-' + faculty.idFaculty);
  }

  save(department: Department) {
    return this.configService.post(prefix + 'save', department);
  }

  edit(department: Department) {
    return this.configService.put(prefix + 'edit', department);
  }

  delete(department: Department) {
    return this.configService.delete(prefix + 'delete-' + department.id);
  }

  getPDF(department: Department) {
    console.log('prefix');
    const query = prefix + 'pdf-' + department.id;
    return this.configService.blob(query);
  }

  getWord(department: Department) {
    console.log('prefix');
    const query = prefix + 'word-' + department.id;
    return this.configService.blob(query);
  }
}
