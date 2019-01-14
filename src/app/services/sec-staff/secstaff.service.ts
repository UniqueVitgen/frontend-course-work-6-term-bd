import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

const prefix="sec-staff/"
@Injectable({
  providedIn: 'root'
})
export class SECStaffService {

  constructor(
    private configService: ConfigService) { }

  getAll() {
    return this.configService.get(prefix+'getAll');
  }

  save(degree) {
    return this.configService.post(prefix + 'save', degree);
  }

  edit(degree) {
    return this.configService.put(prefix + 'edit', degree);
  }

  delete(degree) {
    return this.configService.delete(prefix + 'delete-' + degree.id);
  }
}
