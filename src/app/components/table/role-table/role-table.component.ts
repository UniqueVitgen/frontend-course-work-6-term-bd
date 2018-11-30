import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Group } from '../../../factory/group.factory';
import { User } from '../../../factory/user.factory';
import { UserStorage } from '../../../storage/user/UserStorage';
import { UserWorker } from '../../../workers/UserWorker';
import { Role } from '../../../factory/role.factory';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { RoleFormComponent } from '../../forms/role-form/role-form.component';
import { RoleService } from '../../../services/role/role.service';
import { FormEventService } from '../../../services/events/form/form-event.service';

@Component({
  selector: 'app-role-table',
  templateUrl: './role-table.component.html',
  styleUrls: ['./role-table.component.css']
})
export class RoleTableComponent implements OnInit, OnChanges {
  @Input() roles: Role[];
  @Input('search') searchValue: string;
  @Output('editRole') outputEditRole: EventEmitter<Role> = new EventEmitter();
  @Output('deleteRole') outputDeleteRole: EventEmitter<Role> = new EventEmitter();
  selectedRoles: Role[];
  bsModalRef: BsModalRef;
  displayedColumns= ['name', 'edit', 'delete'];
  displayedColumnsUser = ['name'];
  user: User;
  isAdmin: boolean;

  constructor(private userStorage: UserStorage,
    private modalService: BsModalService,
    private formEventService: FormEventService,
    private roleService: RoleService,
    private userWorker: UserWorker) { }

  ngOnInit() {
    this.user = this.userStorage.getUser();
    this.isAdmin = this.userWorker.hasAdminRole(this.user);
  }
  ngOnChanges(): void {
    this.search(this.searchValue);
  }
 
  openRoleForm(role?: Role) {
    let edit;
    if(role) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      roleEdit: role,

    };
    let modalOptions = {
      initialState: initialState,
      class:'role-form',
      ignoreBackdropClick: true
    }
    this.bsModalRef = this.modalService.show(RoleFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  trackRoles() {
    this.formEventService.hideRoleForm.subscribe(() => {
     //  console.log('hide');
     this.outputEditRole.emit(null);
    })
  }

  search(value: string) {
    if(value) {
      value = value.toUpperCase();
      this.selectedRoles = this.roles.filter((fac) => {
        let targ = fac.name.toUpperCase();
        if(targ.indexOf(value) != -1) {
          return true;
        } 
      });
    }
    else {
      this.selectedRoles = this.roles;
    }

  }


  // openModal(id: string) {
  //   this.modalService.open(id);
  // }

  // closeModal(id: string) {
  //   this.modalService.close(id);
  // }

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

  deleteRole(role) {
    this.roleService.delete(role).subscribe(answer => {
      this.outputDeleteRole.emit(null);
      console.log('answer');
    });
  }

}
