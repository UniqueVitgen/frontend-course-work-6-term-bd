import {EventEmitter, Injectable} from '@angular/core';
import {User} from '../../factory/user.factory';


const USER_KEY = 'acc';
@Injectable()
export class UserStorage {
  changeUser: EventEmitter<User> = new EventEmitter();

  constructor() { }


  signOut() {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.clear();
    this.changeUser.emit(null);
  }

  public saveUser(user: User) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY,  JSON.stringify(user));
    this.changeUser.emit(user);
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public isStudent() {
    const user = this.getUser();
    for (const role of user.roles) {
      if (role.name === 'STUDENT') {
        return true;
      }
    }
  }

  public isLector() {
    const user = this.getUser();
    for (const role of user.roles) {
      if (role.name === 'LECTOR') {
        return true;
      }
    }
  }

}
