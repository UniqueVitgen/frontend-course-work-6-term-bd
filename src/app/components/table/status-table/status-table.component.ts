import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Status } from '../../../factory/status.factory';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { User } from '../../../factory/user.factory';
import { UserStorage } from '../../../storage/user/UserStorage';
import { FormEventService } from '../../../services/events/form/form-event.service';
import { StatusService } from '../../../services/status/status.service';
import { UserWorker } from '../../../workers/UserWorker';
import { StatusFormComponent } from '../../forms/status-form/status-form.component';

@Component({
  selector: 'app-status-table',
  templateUrl: './status-table.component.html',
  styleUrls: ['./status-table.component.css']
})
export class StatusTableComponent implements OnInit {
  @Input() statuses: Status[];
  @Input('search') searchValue: string;
  @Output('editStatus') outputEditStatus: EventEmitter<Status> = new EventEmitter();
  @Output('deleteStatus') outputDeleteStatus: EventEmitter<Status> = new EventEmitter();
  selectedStatuses: Status[];
  bsModalRef: BsModalRef;
  displayedColumns= ['name', 'comment', 'edit', 'delete'];
  displayedColumnsUser = ['name', 'comment'];
  user: User;
  isAdmin: boolean;

  constructor(private userStorage: UserStorage,
    private modalService: BsModalService,
    private formEventService: FormEventService,
    private statusService: StatusService,
    private userWorker: UserWorker) { }

  ngOnInit() {
    this.user = this.userStorage.getUser();
    this.isAdmin = this.userWorker.hasAdminRole(this.user);
  }
  ngOnChanges(): void {
    this.search(this.searchValue);
  }
 
  openStatusForm(status?: Status) {
    let edit;
    if(status) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      statusEdit: status,

    };
    let modalOptions = {
      initialState: initialState,
      class:'status-form',
      ignoreBackdropClick: true
    }
    this.bsModalRef = this.modalService.show(StatusFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  trackStatuss() {
    this.formEventService.hideStatusForm.subscribe(() => {
     //  console.log('hide');
     this.outputEditStatus.emit(null);
    })
  }

  search(value: string) {
    if(value) {
      value = value.toUpperCase();
      this.selectedStatuses = this.statuses.filter((fac) => {
        let targ = fac.name.toUpperCase();
        if(targ.indexOf(value) != -1) {
          return true;
        } 
      });
    }
    else {
      this.selectedStatuses = this.statuses;
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

  deleteStatus(status) {
    this.statusService.delete(status).subscribe(answer => {
      this.outputDeleteStatus.emit(null);
      console.log('answer');
    });
  }

}
