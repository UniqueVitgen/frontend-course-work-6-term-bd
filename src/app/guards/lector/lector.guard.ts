import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GlobalEventsService } from '../../services/events/global/global-events.service';
import { TokenStorage } from '../../storage/token/TokenStorage';
import { UserStorage } from '../../storage/user/UserStorage';

@Injectable()
export class LectorGuard implements CanActivate {

  constructor(private router: Router, 
      private globalEventsManager: GlobalEventsService,
      private userStorage: UserStorage,
      private tokenStorage: TokenStorage) { }

  hasLectorRole(user) {
      for(let role of user.roles) {
          if(role.name == "LECTOR") {
              return true;
          }
      }
  }

  canActivate() {
      if(this.tokenStorage.getToken()) {
          let user = this.userStorage.getUser();  
          if(this.hasLectorRole(this.userStorage.getUser())){
              this.globalEventsManager.showLectorNavBar.emit(true);
              return true;
          }
          return false;
      }
      else {
          return false;
      }
  }
}
