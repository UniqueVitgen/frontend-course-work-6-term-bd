import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalEventsService } from '../../services/events/global/global-events.service';
import { UserStorage } from '../../storage/user/UserStorage';
import { TokenStorage } from '../../storage/token/TokenStorage';

@Injectable({
  providedIn: 'root'
})
export class ExpectedRolesGuard implements CanActivate {
  expectedRoles;

  constructor(private router: Router,
    private globalEventsManager: GlobalEventsService,
    private userStorage: UserStorage,
    private tokenStorage: TokenStorage) {
  }

  hasLectorRole(user) {
    for (const role of user.roles) {
      if (role.name == 'LECTOR') {
        return true;
      }
    }
  }

  checkRoles(user) {
    for (const role of user.roles) {
      if (this.expectedRoles.includes(role.name)) {
        if (role.name === 'ADMIN') {
          this.globalEventsManager.showAdminNavBar.emit(true);
        } else if (role.name === 'LECTOR') {
          this.globalEventsManager.showLectorNavBar.emit(true);
        } else if (role.name === 'SECRETARY_SEC') {
          this.globalEventsManager.showSecretaryNavBar.emit(true);
        } else if (role.name === 'STUDENT') {
          this.globalEventsManager.showStudentsNavBar.emit(true);
        } else if (role.name === 'ORGANIZER') {
          this.globalEventsManager.showOrganizerNavBar.emit(true);
        }
        return true;
      }
    }
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.tokenStorage.getToken()) {
      this.expectedRoles = route.data.expectedRoles;
      const user = this.userStorage.getUser();
      return this.checkRoles(user);
    }
    else {
      return false;
    }
  }
}
