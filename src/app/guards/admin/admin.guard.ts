import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GlobalEventsService } from '../../services/events/global/global-events.service';
import { TokenStorage } from '../../storage/token/TokenStorage';
import { UserStorage } from '../../storage/user/UserStorage';


@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, 
      private globalEventsManager: GlobalEventsService,
      private userStorage: UserStorage,
      private tokenStorage: TokenStorage) { }

  hasStudentRole(user) {
      console.log('user - ',user);
      for(let role of user.roles) {
          if(role.name == "ADMIN") {
              return true;
          }
      }
  }

  canActivate() {
      if(this.tokenStorage.getToken()) {
          console.log('log');
          let user = this.userStorage.getUser();
          console.log('is user - ',this.hasStudentRole(user));    
          if(this.hasStudentRole(this.userStorage.getUser())){
              console.log(this.tokenStorage.getToken());
              this.globalEventsManager.showAdminNavBar.emit(true);
              return true;
          }
          return false;
      }
      else {
          return false;
      }
  }
}
