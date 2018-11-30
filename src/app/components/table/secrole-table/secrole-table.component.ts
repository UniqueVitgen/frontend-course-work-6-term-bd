import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SECRole } from '../../../factory/sec-roles.factory';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { User } from '../../../factory/user.factory';
import { UserStorage } from '../../../storage/user/UserStorage';
import { FormEventService } from '../../../services/events/form/form-event.service';
import { SECRoleService } from '../../../services/sec-role/secrole.service';
import { UserWorker } from '../../../workers/UserWorker';
import { SECRoleFormComponent } from '../../forms/secrole-form/secrole-form.component';

@Component({
  selector: 'app-secrole-table',
  templateUrl: './secrole-table.component.html',
  styleUrls: ['./secrole-table.component.css']
})
export class SECRoleTableComponent implements OnInit {
  @Input() secRoles: SECRole[];
  @Input('search') searchValue: string;
  @Output('editSECRole') outputEditSECRole: EventEmitter<SECRole> = new EventEmitter();
  @Output('deleteSECRole') outputDeleteSECRole: EventEmitter<SECRole> = new EventEmitter();
  selectedSECRoles: SECRole[];
  bsModalRef: BsModalRef;
  displayedColumns= ['name',  'edit', 'delete'];
  displayedColumnsUser = ['name'];
  user: User;
  isAdmin: boolean;

  constructor(private userStorage: UserStorage,
    private modalService: BsModalService,
    private formEventService: FormEventService,
    private secRoleService: SECRoleService,
    private userWorker: UserWorker) { }

  ngOnInit() {
    this.user = this.userStorage.getUser();
    this.isAdmin = this.userWorker.hasAdminRole(this.user);
  }
  ngOnChanges(): void {
    this.search(this.searchValue);
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

  trackSECRoles() {
    this.formEventService.hideSECRoleForm.subscribe(() => {
     //  console.log('hide');
     this.outputEditSECRole.emit(null);
    })
  }

  search(value: string) {
    if(value) {
      value = value.toUpperCase();
      this.selectedSECRoles = this.secRoles.filter((fac) => {
        let targ = fac.name.toUpperCase();
        if(targ.indexOf(value) != -1) {
          return true;
        } 
      });
    }
    else {
      this.selectedSECRoles = this.secRoles;
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

  deleteSECRole(secRole) {
    this.secRoleService.delete(secRole).subscribe(answer => {
      this.outputDeleteSECRole.emit(null);
      console.log('answer');
    });
  }

}
