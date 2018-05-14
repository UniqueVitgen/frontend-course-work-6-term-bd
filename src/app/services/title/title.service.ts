import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

const prefix = 'title/';
@Injectable()
export class TitleService {

  constructor(
    private configService: ConfigService) { }

    getByName(name) {
      return this.configService.get(prefix+'get-by-name/'+ name);
    }

    getAll() {
      return this.configService.get(prefix+'getAll');
    }

}
