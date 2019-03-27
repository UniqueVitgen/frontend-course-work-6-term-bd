import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import {Observable} from 'rxjs';
import {SEC} from '../../factory/sec.factory';

const prefix="sec/"
@Injectable({
  providedIn: 'root'
})
export class SECService {

  constructor(
    private configService: ConfigService) { }

  getById(id) {
    return this.configService.get(prefix + 'sec-' + id);
  }
  getByDiplomId(diplomId: number): Observable<SEC> {
    return this.configService.get(prefix + 'find-by-diplom-' + diplomId);
  }

  getAll() {
    return this.configService.get(prefix + 'getAll');
  }

  save(sec) {
    return this.configService.post(prefix + 'save', sec);
  }

  edit(sec) {
    return this.configService.put(prefix + 'edit', sec);
  }

  delete(sec) {
    return this.configService.delete(prefix + 'delete-' + sec.id);
  }
}
