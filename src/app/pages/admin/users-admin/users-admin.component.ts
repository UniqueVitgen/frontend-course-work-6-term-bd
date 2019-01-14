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
    public router: Router,) {
  }

  getAll() {
    this.userService.getAll().subscribe(users => {
      console.log('facs - ', users);
      this.users = users;
      this.selectedUsers = users;
    })

  }

  keyUp(event) {
    if (event.key === 'Escape') {
      this.search = '';
    }
    this.clickSearch();
  }

  clickSearch() {
    let value = this.search.toUpperCase();
    this.selectedUsers = this.users.filter((fac) => {
      let targ = this.formatFullName(fac).toUpperCase();
      if(targ.indexOf(value) != -1) {
        return true;
      } 
    })
  }

  formatFullName(user) {
    return user.lastname + ' ' +  user.firstname + ' ' + user.middlename;
  }

  formatUserRole(user) {
    return user.roles[0].name;
  }

  goToUser(user) {
    this.router.navigate(['user',  user.idPerson])
  }

  trackFormUserHide() {
    // this.formEventService.hideUserForm.subscribe(()=> {
    //   this.getAll();
    // })
  }
 
  openUserForm(user?) {
    let edit;
    if(user) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      userEdit: user,

    };
    let modalOptions = {
      initialState: initialState,
      class:'user-form',
      ignoreBackdropClick: true

    }
    // this.bsModalRef = this.modalService.show(UserFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }


  // openModal(id: string) {
  //   this.modalService.open(id);
  // }

  // closeModal(id: string) {
  //   this.modalService.close(id);
  // }

  addUser() {
    this.router.navigate(['new-user'])
  }

  // closeModal() {
  //   console.log('inner');
  //   try {
  //     this.modal.close().then(answer => {
  //       console.log('close1 - ', answer);
  //     }).catch(err => {
  //       console.log('close1 err - ', err);
  //     });;
  //     this.modal.dismiss().then(answer => {
  //       console.log('close2 - ', answer);
  //     }).catch(err => {
  //       console.log('close2 err - ', err);
  //     });
  //   }
  //   catch (err) {
  //     console.log('err - ', err);
  //   }
  // }

  deleteUser(user) {
    // this.userService.delete(user).subscribe(answer => {
    //   console.log('answer');
    //   this.getAll();
    // })
  }

  ngOnInit() {
    this.getAll();
    this.trackFormUserHide();
    setTimeout(() => {
      // this.modalService.open('1');

    }, 5000);
  }

}
