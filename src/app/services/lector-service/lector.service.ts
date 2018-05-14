import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import 'rxjs/add/operator/map';

const prefix = 'lectors/';
@Injectable()
export class LectorService {

  constructor(
    private configService: ConfigService
  ) { }

  getLectors() {
    return this.configService.get(prefix + 'getAll');
  }


}
