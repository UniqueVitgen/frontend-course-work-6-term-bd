import { Component, OnInit, ViewChild } from '@angular/core';

// import { UserFormComponent } from '../../../components/forms/user-form/user-form.component';

import { PasswordValidator } from '../../../validators/password.validator';
import { UserService } from '../../../services/user-service/user.service';
import { Router } from '@angular/router';
import { BsModalComponent } from 'ng2-bs3-modal';
import { ModalService } from '../../../services/modal-service/modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormEventService } from '../../../services/events/form/form-event.service';
import {UserWorker} from '../../../workers/UserWorker';
import {User} from '../../../factory/user.factory';
import {UserOrganization} from '../../../factory/table/user-organization.factory';
import {DegreeFormComponent} from '../../../components/forms/degree-form/degree-form.component';
import {ChangePasswordFormComponent} from '../../../components/forms/change-password-form/change-password-form.component';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit {
  bsModalRef: BsModalRef;
  public users;
  public selectedUsers;
  search;

  constructor(public userService: UserService,
    private modalService: BsModalService,
    private formEventService: FormEventService,
    public router: Router, public userWorker: UserWorker) {
  }

  getAll() {
    this.userService.getAll().subscribe(users => {
      console.log('facs - ', users);
      this.users = users;
      this.selectedUsers = users;
    });

  }

  keyUp(event) {
    if (event.key === 'Escape') {
      this.search = '';
    }
    this.clickSearch();
  }

  clickSearch() {
    const value = this.search.toUpperCase();
    this.selectedUsers = this.users.filter((fac) => {
      const targ = this.formatFullName(fac).toUpperCase();
      if (targ.indexOf(value) !== -1) {
        return true;
      }
    });
  }

  formatFullName(user) {
    return user.lastname + ' ' +  user.firstname + ' ' + user.middlename;
  }

  formatUserRole(user: User) {
    return this.userWorker.formatUserRole(user);
  }

  goToUser(user) {
    this.router.navigate(['user',  user.idPerson]);
  }

  trackFormUserHide() {
    // this.formEventService.hideUserForm.subscribe(()=> {
    //   this.getAll();
    // })
  }

  changeUserPassword(user: User): void {
      const initialState = {
        object: user
      };
      const modalOptions = {
        initialState: initialState,
        class: 'degree-form',
        ignoreBackdropClick: true
      };
      this.bsModalRef = this.modalService.show(ChangePasswordFormComponent, modalOptions);
      this.bsModalRef.content.closeBtnName = 'Close';
  }

  changeUserOrganization(userOrganization: UserOrganization) {
    this.userService.editUserOrganizerRole(userOrganization.user, userOrganization.isOrganization).subscribe(resUser => {
    });
  }

  addUser() {
    this.router.navigate(['new-user']);
  }

  deleteUser(user: User) {
    this.userService.delete(user).subscribe(answer => {
      console.log('answer');
      this.getAll();
    });
  }

  ngOnInit() {
    this.getAll();
    this.trackFormUserHide();
    setTimeout(() => {
      // this.modalService.open('1');

    }, 5000);
  }

}
