import { Injectable } from '@angular/core';


const USER_KEY = 'acc';
@Injectable()
export class UserStorage {

  constructor() { }


  signOut() {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.clear();
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY,  JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public isStudent() {
    let user = this.getUser();
    for(let role of user.roles) {
      if(role.name == "STUDENT") {
        return true;
      }
    }
  }

  public isLector() {
    let user = this.getUser();
    for(let role of user.roles) {
      if(role.name == "LECTOR") {
        return true;
      }
    }
  }

}