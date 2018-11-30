import { Component, OnInit } from '@angular/core';
import { SECRole } from '../../../factory/sec-roles.factory';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SECRoleService } from '../../../services/sec-role/secrole.service';
import { FormEventService } from '../../../services/events/form/form-event.service';
import { SECRoleFormComponent } from '../../../components/forms/secrole-form/secrole-form.component';

@Component({
  selector: 'app-secrole-admin',
  templateUrl: './secrole-admin.component.html',
  styleUrls: ['./secrole-admin.component.css']
})
export class SECRoleAdminComponent implements OnInit {
  secRoles: SECRole[];
  searchValue: string;
  bsModalRef: BsModalRef;

  constructor(private secRoleService: SECRoleService,
    private formEventService: FormEventService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getSECRoles();
    this.trackSECRolees();
  }

  getSECRoles() {
    this.secRoleService.getAll().subscribe(resSECRolees => {
      this.secRoles = resSECRolees;
    })
  }
 
  openSECRoleForm(secRole?: SECRole) {
    let edit;
    if(secRole) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      secRoleEdit: secRole,

    };
    let modalOptions = {
      initialState: initialState,
      class:'secRole-form',
      ignoreBackdropClick: true
    }
    this.bsModalRef = this.modalService.show(SECRoleFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  changeInput(value: string) {
    this.searchValue = value;
  }

  trackSECRolees() {
    this.formEventService.hideSECRoleForm.subscribe(() => {
     //  console.log('hide');
     this.getSECRoles();
    })
  }

}
