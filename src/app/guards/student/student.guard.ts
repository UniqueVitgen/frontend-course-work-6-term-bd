import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GlobalEventsService } from '../../services/events/global/global-events.service';
import { TokenStorage } from '../../storage/token/TokenStorage';
import { UserStorage } from '../../storage/user/UserStorage';

@Injectable()
export class StudentGuard implements CanActivate {

    constructor(private router: Router, 
        private globalEventsManager: GlobalEventsService,
        private userStorage: UserStorage,
        private tokenStorage: TokenStorage) { }

    hasStudentRole(user) {
        console.log('user - ',user);
        for(let role of user.roles) {
            if(role.name == "STUDENT") {
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
                this.globalEventsManager.showStudentsNavBar.emit(true);
                return true;
            }
            return false;
        }
        else {
            return false;
        }

        // console.log('entered in activated');

        // if (localStorage.getItem('student')) {

        //     this.globalEventsManager.showStudentsNavBar.emit(true);

        //     console.log(localStorage.getItem('student'));
        //     return true;
        // }
        // else {
        //     // not logged in so redirect to login page
        //     this.globalEventsManager.showUnathoridNavBar.emit(true);

        //     console.log(localStorage.getItem('student'));
        //     return;
        // }


    }
}
