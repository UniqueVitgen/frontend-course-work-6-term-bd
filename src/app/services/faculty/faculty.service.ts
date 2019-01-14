import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { University } from '../../factory/university.factory';

const prefix = 'faculty/';
@Injectable()
export class FacultyService {

  constructor(public configService: ConfigService) {

   }

   get(faculty) {
     return this.configService.get(prefix + 'faculty-' + faculty.idFaculty);
   }
   getById(id) {
     return this.configService.get(prefix + 'faculty-' + id);
   }

   getAll() {
     return this.configService.get(prefix + 'getAll');
   }

   getAllByUniversity(university: University) {
    return this.configService.get(prefix + 'findAll-by-university-' + university.id);
   }

   save(faculty) {
     return this.configService.post(prefix + 'save', faculty);
   }

   edit(faculty) {
     return this.configService.put(prefix + "edit", faculty);
   }

   delete(faculty) {
     return this.configService.delete(prefix + 'delete-' + faculty.idFaculty);
   }

}
