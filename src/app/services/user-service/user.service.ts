import { Injectable } from '@angular/core';

import { ConfigService } from '../config/config.service';
import 'rxjs/add/operator/map';
import {User, UserUploadForm} from '../../factory/user.factory';

const TOKEN_KEY = 'AuthToken';
const prefix = 'users/';
@Injectable()
export class UserService {

  constructor(
    private configService: ConfigService) { }

    getUsers() {
      return this.configService.get(prefix + 'getAll');
    }

    getByUsername(username) {
      return this.configService.get(prefix + 'user-username/' + username);
    }

    getById(id) {
      return this.configService.get(prefix + 'user-' + id);
    }

    getAll() {
      return this.configService.get(prefix + 'getAll');

    }

    updateUser(user: User) {
      return this.configService.put(prefix + 'update-user', user);
    }

    uploadPhoto(userUploadForm: User, filename: string) {
      return this.configService.get(prefix + 'upload-photo?idUser=' + userUploadForm.idPerson + '&filename=' + filename);
    }

    editUserOrganizerRole(user: User, isOrganizer: boolean) {
      return this.configService.put(prefix + 'update-user-organizer-role-' + isOrganizer, user);
    }

}
