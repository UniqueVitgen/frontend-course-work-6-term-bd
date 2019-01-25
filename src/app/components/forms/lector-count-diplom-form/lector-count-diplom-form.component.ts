import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BsDatepickerDirective, BsModalRef} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormEventService} from '../../../services/events/form/form-event.service';
import {Lector} from '../../../factory/lector.factory';
import {LectorService} from '../../../services/lector-service/lector.service';
import {UserService} from '../../../services/user-service/user.service';

@Component({
  selector: 'app-lector-count-diplom-form',
  templateUrl: './lector-count-diplom-form.component.html',
  styleUrls: ['./lector-count-diplom-form.component.css']
})
export class LectorCountDiplomFormComponent implements OnInit, OnDestroy {
  startDate;
  endDate;
  lectorForm: FormGroup;
  lector: Lector;
  bsRangeValue: Date[];
  lectorEdit;
  isEdit;
  onDestroy;
  percentArrayValidators;

  constructor(public formBuilder: FormBuilder,
              private formEventService: FormEventService,
              private userService: UserService,
              public bsModalRef: BsModalRef, public lectorService: LectorService) {


  }

  ngOnInit() {
    this.configFormGroup();
    if (this.isEdit) { this.lector = this.lectorEdit; }
  }
  configFormGroup() {
    this.lectorForm = this.formBuilder.group({
      countDiplomWorks: [0, Validators.compose([Validators.required, Validators.min(this.lector.countOfDiplom)])]
    });
  }

  ngOnDestroy(): void {
    // this.formEventService.hideLectorForm.emit(true);
    if (this.onDestroy) {
      this.onDestroy();
    }
  }

  cancel() {
    this.bsModalRef.hide();
  }

  edit() {
    console.log('lector - ', this.lector);
    this.lectorService.edit(this.lector).subscribe(res => {
        this.cancel();
    });
    // this.userService.
    // this.lectorService.editByName(this.lector, this.lector.name).subscribe(res => {
    //   console.log('res - ', res);
    //   this.cancel();
    // });
  }
}
