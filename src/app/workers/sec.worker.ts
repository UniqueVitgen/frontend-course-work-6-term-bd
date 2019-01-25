import {Injectable} from '@angular/core';
import {SEC} from '../factory/sec.factory';
import {SECUser, User} from '../factory/user.factory';

@Injectable({
  providedIn: 'root'
})
export class SecWorker {
  public haveSecretary(sec: SEC): boolean {
    const users = sec.users;
    for (const user of users) {
      for (const role of user.roles) {
        if (role.name === 'SECRETARY') {
          return true;
        }
      }
    }
  }
  public userIsSecretaryInSec(sec: SEC, user: User): boolean {
    if (sec && user) {
      const users = sec.users;
      console.log('users', sec);
      if (users && users.length > 0) {
        for (const secUser of users) {
          for (const role of secUser.roles) {
            if (role.name === 'SECRETARY') {
              const targetUser = secUser.user;
              return targetUser.idPerson === user.idPerson;
            }
          }
        }
      }
    }

  }
}
