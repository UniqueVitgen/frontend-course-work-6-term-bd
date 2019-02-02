import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role/role.service';
import { Role } from '../../../factory/role.factory';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { RoleFormComponent } from '../../../components/forms/role-form/role-form.component';
import { FormEventService } from '../../../services/events/form/form-event.service';

@Component({
  selector: 'app-role-admin',
  templateUrl: './role-admin.component.html',
  styleUrls: ['./role-admin.component.css']
})
export class RoleAdminComponent implements OnInit {
  roles: Role[];
  bsModalRef: BsModalRef;
  searchValue: string;

  constructor(private roleService: RoleService,
    private formEventService: FormEventService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getRoles();
    this.trackSpecializations();
  }

  getRoles() {
    this.roleService.getRoles().subscribe(resRoles => {
      this.roles = resRoles;
    });
  }

  changeInput(value: string) {
    this.searchValue = value;
  }

  openRoleForm(role?: Role) {
    let edit;
    if (role) {
      edit = true;
    }
    else {
      edit = false;
    }
    const initialState = {
      isEdit: edit,
      roleEdit: role,

    };
    const modalOptions = {
      initialState: initialState,
      class: 'role-form',
      ignoreBackdropClick: true
    };
    this.bsModalRef = this.modalService.show(RoleFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  trackSpecializations() {
    this.formEventService.hideRoleForm.subscribe(() => {
     //  console.log('hide');
       this.getRoles();
    });
  }

}
