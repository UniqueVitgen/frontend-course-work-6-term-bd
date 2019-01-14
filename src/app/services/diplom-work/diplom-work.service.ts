import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

const prefix = 'diplom-work/';
@Injectable()
export class DiplomWorkService {

  constructor(public configService: ConfigService) {

   }

   get(diplomWork) {
     return this.configService.get(prefix + 'diplom-work-' + diplomWork.id);
   }
   getById(id) {
     return this.configService.get(prefix + 'diplom-work-' + id);
   }

   getAll() {
     return this.configService.get(prefix + 'getAll');
   }

   save(diplomWork) {
     return this.configService.post(prefix + 'save', diplomWork);
   }

   edit(diplomWork) {
     return this.configService.put(prefix + "edit", diplomWork);
   }
   
   editByStatus(diplomWork, status) {
      return this.configService.put(prefix + "edit-status-" + diplomWork.id, status);
   }
   
   editByName(diplomWork, name) {
      return this.configService.get(prefix + "edit-name-" + diplomWork.id + "?name=" + name);
   }

   delete(diplomWork) {
     return this.configService.delete(prefix + 'delete-' + diplomWork.id);
   }

   findAllByLeader(leader) {
    return this.configService.get(prefix + 'get-all-by-leader-' + leader.idPerson);
   }

   findAllByLector(leader) {
    return this.configService.get(prefix + 'get-all-by-lector-' + leader.idPerson);
   }

   findByStudent(student) {
     return this.configService.get(prefix + 'get-by-student-' + student.idPerson);
   }

   findByStudentIdPerson(idPerson) {
    return this.configService.get(prefix + 'get-by-student-' + idPerson);
   }

   getWord(diplomWork) {
     console.log('prefix');
     let query = prefix + 'word-' + diplomWork.id;
    return this.configService.blob(query);
   }

   getPDF(diplomWork) {
     console.log('prefix');
     let query = prefix + 'pdf-' + diplomWork.id;
    return this.configService.blob(query);
   }
}
