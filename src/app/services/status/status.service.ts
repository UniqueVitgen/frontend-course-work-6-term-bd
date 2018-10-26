import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

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

  get(specialization) {
    return this.configService.get(prefix + 'specialization-' + specialization.idSpecialization);
  }

}
