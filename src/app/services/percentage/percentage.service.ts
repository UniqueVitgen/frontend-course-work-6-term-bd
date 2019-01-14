import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

const prefix ="percentage/";
@Injectable()
export class PercentageService {

  constructor(
    private configService: ConfigService) { }
    
    save(percentage) {
      return this.configService.post(prefix+'save',percentage);
    }
    
    edit(percentage) {
      return this.configService.put(prefix+'edit',percentage);
    }

    getAll() {
      return this.configService.get(prefix+'getAll');
    }

    getAllByDiplomWork(diplomWork) {
      return this.configService.get(prefix+'getAll');
    }

    delete(percentage) {
      return this.configService.delete(prefix + 'delete-' + percentage.id);
    }

    deleteById(id) {
      return this.configService.delete(prefix + 'delete-' + id);
    }

}
