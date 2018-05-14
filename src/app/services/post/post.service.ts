import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

const prefix ="post/"
@Injectable()
export class PostService {

  constructor(
    private configService: ConfigService) { }

    getByName(name) {
      return this.configService.get(prefix+'get-by-name/'+ name);
    }

    getAll() {
      return this.configService.get(prefix+'getAll');
    }

}
