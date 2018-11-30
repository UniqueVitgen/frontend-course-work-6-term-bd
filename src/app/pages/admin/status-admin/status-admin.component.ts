import { Component, OnInit } from '@angular/core';
import { StatusService } from '../../../services/status/status.service';
import { Status } from '../../../factory/status.factory';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { StatusFormComponent } from '../../../components/forms/status-form/status-form.component';
import { FormEventService } from '../../../services/events/form/form-event.service';

@Component({
  selector: 'app-status-admin',
  templateUrl: './status-admin.component.html',
  styleUrls: ['./status-admin.component.css']
})
export class StatusAdminComponent implements OnInit {
  statuses: Status[];
  searchValue: string;
  bsModalRef: BsModalRef;

  constructor(private statusService: StatusService,
    private formEventService: FormEventService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getStatuses();
    this.trackStatuses();
  }

  getStatuses() {
    this.statusService.getAll().subscribe(resStatuses => {
      this.statuses = resStatuses;
    })
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

  changeInput(value: string) {
    this.searchValue = value;
  }

  trackStatuses() {
    this.formEventService.hideStatusForm.subscribe(() => {
     //  console.log('hide');
     this.getStatuses();
    })
  }

}
