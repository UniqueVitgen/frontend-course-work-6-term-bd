import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StatusService } from '../../../services/status/status.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap';
import { FormEventService } from '../../../services/events/form/form-event.service';
import { Status } from '../../../factory/status.factory';

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.css']
})
export class StatusFormComponent implements OnInit {
  public statusForm;
  public status: Status = {name: '', comment: ''};
  public statusEdit;
  sub;
  isEdit;

  constructor(public formBuilder: FormBuilder, public statusService: StatusService, public router: Router,
  private route: ActivatedRoute, public bsModalRef: BsModalRef, public formEventService: FormEventService) { 
    
    this.statusForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      comment: ['', Validators.compose([])]
    })
  }

  saveStatus() {
    this.statusService.save(this.status).subscribe(answer => {
      console.log('answer from save Status - ', answer);
      this.cancel();
    })

  }

  editStatus(status) {
    // console.log('edited - ', this.StatusEdit);
    this.createStatusEditFromStatus();
    console.log('edited - ', this.statusEdit);
    this.statusService.edit(this.statusEdit).subscribe(answer => {
      console.log(answer);
      this.cancel();
    })
  }

  cancel() {
    this.formEventService.hideStatusForm.emit(true);
    this.bsModalRef.hide();
  }

  createStatusFromEditStatus() {
    for(let property in this.status) {
      this.status[property] = this.statusEdit[property];
    }
  }

  createStatusEditFromStatus() {
    for(let property in this.status) {
      this.statusEdit[property] = this.status[property];
    }
  }

  determineIfEdit() {
    if(this.statusEdit) {
      this.createStatusFromEditStatus();
      console.log('edit - ', this.isEdit);
    }
  }

  ngOnInit() {
    this.formEventService.showStatusForm.emit(true);
    console.log('on init');
    console.log(this.statusEdit);
    this.determineIfEdit();

  }
  
  ngOnDestroy(): void {
    this.formEventService.hideStatusForm.emit(true);
  }

}
