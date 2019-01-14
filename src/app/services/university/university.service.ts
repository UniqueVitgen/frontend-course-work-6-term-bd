import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { University } from '../../factory/university.factory';

const prefix = 'university/';
@Injectable({
  providedIn: 'root'
})
export class UniversityService {



  constructor(public configService: ConfigService) {

  }
  get(university: University) {
    return this.configService.get(prefix + 'university-' + university.id);
  }
  getById(id) {
    return this.configService.get(prefix + 'university-' + id);
  }

  getAll() {
    return this.configService.get(prefix + 'getAll');
  }

  save(university: University) {
    return this.configService.post(prefix + 'save', university);
  }

  edit(university: University) {
    return this.configService.put(prefix + "edit", university);
  }

  delete(university: University) {
    return this.configService.delete(prefix + 'delete-' + university.id);
  }
}
