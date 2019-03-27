import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBase} from '../base/form.base';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {SEC} from '../../../factory/sec.factory';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormEventService} from '../../../services/events/form/form-event.service';
import {DateTimeWorker} from '../../../workers/DateTimeWorker';
import {SECService} from '../../../services/sec/sec.service';

@Component({
  selector: 'app-secnumber-form',
  templateUrl: './secnumber-form.component.html',
  styleUrls: ['./secnumber-form.component.css']
})
export class SECNumberFormComponent extends FormBase implements OnInit, OnDestroy {
  secForm: FormGroup;
  sec: SEC = {
    specializations: []
  };
  isEdit;
  onDestroy;

  constructor(public formBuilder: FormBuilder,
              private formEventService: FormEventService,
              private modalService: BsModalService,
              private cd: ChangeDetectorRef,
              private dateTimeWorker: DateTimeWorker,
              public bsModalRef: BsModalRef, public secService: SECService) {
    super(bsModalRef);

    this.configFormGroup();
  }
  configFormGroup() {
    this.secForm = this.formBuilder.group({
      number: [undefined, Validators.compose([Validators.required])]
    });
  }

  save() {
    console.log('sec - ', this.objectEdit);
    this.secService.save(this.objectEdit).subscribe(res => {
      console.log('res - ', res);
      this.cancel();
    });
  }

  edit() {
    this.secService.edit(this.objectEdit).subscribe(res => {
      console.log('res - ', res);
      this.cancel();
    });
  }

}
