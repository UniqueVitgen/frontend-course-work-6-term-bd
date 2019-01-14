import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

const prefix ="post-organization/";
@Injectable({
  providedIn: 'root'
})
export class PostOrganizationService {

  constructor(
    private configService: ConfigService) { }

  getAll() {
    return this.configService.get(prefix+'getAll');
  }
}
