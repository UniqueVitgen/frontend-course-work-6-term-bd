import {Injectable} from '@angular/core';
import {SEC} from '../factory/sec.factory';
import {SECUser, User} from '../factory/user.factory';
import {SECEvent} from '../factory/sec-event.factory';
import {DateTimeWorker} from './DateTimeWorker';

@Injectable({
  providedIn: 'root'
})
export class SecWorker {
  constructor(public dateTimeWorker: DateTimeWorker) {}
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
  public haveChairman(sec: SEC): boolean {
    const users = sec.users;
    for (const user of users) {
      for (const role of user.roles) {
        if (role.name === 'CHAIRMAN') {
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
              return targetUser && targetUser.idPerson === user.idPerson;
            }
          }
        }
      }
    }
  }
  public dateInSEC(sec: SEC, date: any): boolean {
    return this.dateTimeWorker.compareDates(date, sec.startDate) !== -1 && this.dateTimeWorker.compareDates(date, sec.endDate) !== 1;
  }
  public secEventInSEC(sec: SEC, secEvent: SECEvent): boolean {
    return this.dateInSEC(sec, secEvent.date);
  }
}
