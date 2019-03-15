import {OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BsDatepickerDirective, BsModalRef} from 'ngx-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import {FormEventService} from '../../../services/events/form/form-event.service';
import {DegreeService} from '../../../services/degree/degree.service';

export abstract class FormBase implements OnInit, OnDestroy {
  object;
  objectEdit;
  isEdit;
  onDestroy;

  protected constructor(protected bsModalRef: BsModalRef) {
  }

  public ngOnInit() {
    if (this.isEdit) { this.object = this.objectEdit; }
  }

  ngOnDestroy(): void {
    if (this.onDestroy) {
      this.onDestroy();
    }
  }

  cancel() {
    this.bsModalRef.hide();
  }
}
