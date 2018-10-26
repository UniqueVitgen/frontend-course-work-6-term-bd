import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { SECRole } from '../../factory/sec-roles.factory';
import { Observable } from 'rxjs';

const prefix="sec-role/"
@Injectable({
  providedIn: 'root'
})
export class SECRoleService {


  constructor(
    private configService: ConfigService) { }

  getAll(): Observable<SECRole[]> {
    return this.configService.get(prefix+'getAll');
  }

  save(degree): Observable<SECRole> {
    return this.configService.post(prefix + 'save', degree);
  }

  edit(degree): Observable<SECRole> {
    return this.configService.put(prefix + 'edit', degree);
  }

  delete(degree) {
    return this.configService.delete(prefix + 'delete-' + degree.id);
  }
}
