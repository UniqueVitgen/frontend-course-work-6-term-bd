import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

const prefix ="organization/";
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(
    private configService: ConfigService) { }

  getAll() {
    return this.configService.get(prefix+'getAll');
  }

}
