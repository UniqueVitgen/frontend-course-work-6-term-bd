import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

const prefix ="qualification/"
@Injectable()
export class QualificationService {

  constructor(
    private configService: ConfigService) { }

    get(qualification) {
      return this.configService.get(prefix+'qualification-'+ qualification.id);
    }

    getById(id) {
      return this.configService.get(prefix+'qualification-'+ id);
    }

    getAll() {
      return this.configService.get(prefix+'getAll');
    }

    save(qualification) {
      return this.configService.post(prefix + 'save', qualification);
    }
 
    edit(qualification) {
      return this.configService.put(prefix + "edit", qualification);
    }


    delete(qualification) {
      return this.configService.delete(prefix + 'delete-' + qualification.id);
    }

    deleteById(id) {
      return this.configService.delete(prefix + 'delete-' + id);
    }

}
