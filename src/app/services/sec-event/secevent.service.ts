import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

const prefix="sec-event/"
@Injectable({
  providedIn: 'root'
})
export class SECEventService {

  constructor(
    private configService: ConfigService) { }

  getAll() {
    return this.configService.get(prefix+'getAll');
  }

  save(secEvent) {
    return this.configService.post(prefix + 'save', secEvent);
  }

  saveBySec(secEvent, sec) {
    return this.configService.post(prefix + 'save-' + sec.id , secEvent);
  }

  edit(secEvent) {
    return this.configService.put(prefix + 'edit', secEvent);
  }

  delete(secEvent) {
    return this.configService.delete(prefix + 'delete-' + secEvent.id);
  }
}
