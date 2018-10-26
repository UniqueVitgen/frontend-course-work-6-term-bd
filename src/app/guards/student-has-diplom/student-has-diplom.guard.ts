import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GlobalEventsService } from '../../services/events/global/global-events.service';
import { TokenStorage } from '../../storage/token/TokenStorage';
import { UserStorage } from '../../storage/user/UserStorage';
import { DiplomWorkService } from '../../services/diplom-work/diplom-work.service';

@Injectable()
export class StudentHasDiplomGuard implements CanActivate {



  constructor(private router: Router,
    private globalEventsManager: GlobalEventsService,
    private userStorage: UserStorage,
    private diplomWorkService: DiplomWorkService,
    private tokenStorage: TokenStorage) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.tokenStorage.getToken()) {
      let user = this.userStorage.getUser();
      if (this.hasStudentRole(this.userStorage.getUser())) {
        return new Promise((resolve) => {
          
          this.diplomWorkService.findByStudent(user).subscribe(res => {
            console.log('res diplom - ',res);
              if(res) {
                this.router.navigate(['diplom-work', res.id]);
                resolve(false);
              }
              else {
                resolve(true);
              }
          }, err => {
            resolve(true);
          })
        })
        // console.log(this.tokenStorage.getToken());
        // this.globalEventsManager.showStudentsNavBar.emit(true);
        // return true;
      }
      // this.router.navigate(['diplom-work', res.id]);
      return true;
    }
    else {
      // this.router.navigate(['diplom-work', res.id]);
      return true;
    }
  }

  hasStudentRole(user) {
    console.log('user - ', user);
    for (let role of user.roles) {
      if (role.name == "STUDENT") {
        return true;
      }
    }
  }
}
