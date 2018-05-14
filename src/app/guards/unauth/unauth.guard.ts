import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GlobalEventsService } from '../../services/events/global/global-events.service';

@Injectable()
export class UnauthGuard implements CanActivate {
  constructor(private router: Router, private globalEventsManager: GlobalEventsService) { }

    canActivate() {
        this.globalEventsManager.showUnathoridNavBar.emit(true);
        return true;

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
