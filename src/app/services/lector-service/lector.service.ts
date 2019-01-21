import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import 'rxjs/add/operator/map';
import {SECUser} from '../../factory/user.factory';
import {Lector} from '../../factory/lector.factory';
import {Observable} from 'rxjs';
import {Group} from '../../factory/group.factory';

const prefix = 'lectors/';
@Injectable()
export class LectorService {

  constructor(
    private configService: ConfigService
  ) { }

  getLectors() {
    return this.configService.get(prefix + 'getAll');
  }
  getLectorsNotInSecUserIds(secUserList: SECUser[]) {
    let query = prefix + 'findAllBySecUserIsNotIn';
    secUserList.forEach((secUser, index) => {
      if (index === 0) {
        query += '?ids=' + secUser.id;
      } else {
        query += '&ids=' + secUser.id;
      }
    });
    return this.configService.get(query);
  }
  edit(lector: Lector): Observable<Lector> {
    return this.configService.put(prefix + 'edit', lector);
  }

  getWord() {
    console.log('prefix');
    const query = prefix + 'word';
    return this.configService.blob(query);
  }


}
