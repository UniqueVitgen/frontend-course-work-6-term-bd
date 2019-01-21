import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BsDatepickerDirective, BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { FormEventService } from '../../../services/events/form/form-event.service';
import { DiplomWorkService } from '../../../services/diplom-work/diplom-work.service';

@Component({
  selector: 'app-diplom-work-title-form',
  templateUrl: './diplom-work-title-form.component.html',
  styleUrls: ['./diplom-work-title-form.component.css']
})
export class DiplomWorkTitleFormComponent implements OnInit, OnDestroy {
  startDate;
  endDate;
  diplomWorkForm;
  diplomWork = {
    name: '',
  }
  bsRangeValue: Date[];
  @ViewChild('dpe') datepickerstart: BsDatepickerDirective;
  @ViewChild('dpe') datepickerend: BsDatepickerDirective;
  dateConfig = {
    dateInputFormat: 'DD.MM.YYYY'
  }
  previous;
  next;
  minDate;
  maxDate;
  diplomWorkEdit;
  isEdit;
  onDestroy;
  percentArrayValidators;

  constructor(public formBuilder: FormBuilder,
    private formEventService: FormEventService,
    public bsModalRef: BsModalRef, public diplomWorkService: DiplomWorkService) {


    this.configFormGroup();
  }

  ngOnInit() {
    // console.log('diplomWork - ', this.diplomWork);
    if (this.startDate) {
      this.minDate = new Date(this.startDate);
    }
    if (this.isEdit) { this.diplomWork = this.diplomWorkEdit; }
    setTimeout(() => {
      this.configPercentValidation();
    }, 200);
  }

  configPercentValidation() {
    const validators = [];
    if (this.previous) {
      validators.push(Validators.min(Number(this.previous.percent) + 1));
    }
    if (this.next) {
      validators.push(Validators.max(Number(this.next.percent) - 1));
    }
    this.percentArrayValidators = validators;
    console.log('form - ', this.diplomWorkForm);
  }
  configFormGroup() {
    this.diplomWorkForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],

    })
  }

  ngOnDestroy(): void {
    this.formEventService.hideDiplomWorkForm.emit(true);
    if (this.onDestroy) {
      this.onDestroy();
    }
  }

  changeStartDate() {
    console.log('change start date');
  }

  changeEndDate() {

  }

  cancel() {
    this.bsModalRef.hide();
  }

  edit() {
    console.log('diplomWork - ', this.diplomWork);
    this.diplomWorkService.editByName(this.diplomWork, this.diplomWork.name).subscribe(res => {
      console.log('res - ', res);
      this.cancel();
    })
  }

}
