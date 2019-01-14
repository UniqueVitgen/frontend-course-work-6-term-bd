import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GlobalEventsService } from '../../services/events/global/global-events.service';
import { TokenStorage } from '../../storage/token/TokenStorage';
import { UserStorage } from '../../storage/user/UserStorage';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private globalEventsManager: GlobalEventsService,
        private userStorage: UserStorage,
        private tokenStorage: TokenStorage) { }

    hasStudentRole(user) {
        for (let role of user.roles) {
            if (role.name == "STUDENT") {
                return true;
            }
        }
    }



    hasAdminRole(user) {
        for (let role of user.roles) {
            if (role.name == "ADMIN") {
                return true;
            }
        }
    }

    hasLectorRole(user) {
        for (let role of user.roles) {
            if (role.name == "LECTOR") {
                return true;
            }
        }
    }

    hasOrganizerRole(user) {
        for (let role of user.roles) {
            if (role.name == "ORGANIZER") {
                return true;
            }
        }
    }

    hasSecretaryRole(user) {
        for (let role of user.roles) {
            if (role.name == "SECRETARY_SEC") {
                return true;
            }
        }
    }

    canActivate() {
        if (this.tokenStorage.getToken()) {
            let user = this.userStorage.getUser();
            console.log('user - ', user);
            if (this.hasAdminRole(user)) {
                this.globalEventsManager.showAdminNavBar.emit(true);
                return true;
            }
            else if (this.hasStudentRole(user)) {
                this.globalEventsManager.showStudentsNavBar.emit(true);
                return true;
            }
            else if (this.hasLectorRole(user)) {
                console.log('user is lector');
                this.globalEventsManager.showLectorNavBar.emit(true);
                return true;
            }
            else if (this.hasOrganizerRole(user)) {
                this.globalEventsManager.showOrganizerNavBar.emit(true);
                return true;
            }
            else if(this.hasSecretaryRole(user)) {
                this.globalEventsManager.showSecretaryNavBar.emit(true);
                return true;
            }
            return false;
        }
        else {
            return false;
        }


    }
}
