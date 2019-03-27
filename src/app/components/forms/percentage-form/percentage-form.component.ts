import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsDaterangepickerDirective, BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { PercentageService } from '../../../services/percentage/percentage.service';
import {Percentage} from '../../../factory/percentage.factory';

@Component({
  selector: 'app-percentage-form',
  templateUrl: './percentage-form.component.html',
  styleUrls: ['./percentage-form.component.css']
})
export class PercentageFormComponent implements OnInit, OnDestroy {
  startDate;
  endDate;
  sec;
  percentageForm;
  percentage = {
    name: '',
    comment: '',
    startDate: undefined,
    endDate: undefined,
    planPercent: '',
    factPercent: '',
    sec: undefined
  };
  bsRangeValue: Date[];
  @ViewChild('dpe') datepickerstart: BsDatepickerDirective;
  @ViewChild('dpe') datepickerend: BsDatepickerDirective;
  dateConfig = {
    dateInputFormat: 'DD.MM.YYYY'
  };
  previous;
  next;
  minDate;
  maxDate;
  percentageEdit;
  isEdit;
  onDestroy;
  percentArrayValidators;

  constructor(public formBuilder: FormBuilder, public bsModalRef: BsModalRef, public percentageService: PercentageService ) {


    this.configFormGroup();
  }

  ngOnInit() {
    // console.log('sec - ', this.sec);
    if (this.startDate) {
      this.minDate = new Date(this.startDate);
      this.percentage.startDate = new Date(this.minDate);
    } else if (this.previous) {this.minDate = new Date(this.previous.endDate); }
    if (this.endDate) {
      this.maxDate = new Date(this.endDate); this.percentage.endDate = new Date(this.endDate);
    } else if (this.next) {this.maxDate = new Date(this.next.startDate); }
    console.log('sec', this.sec);
    if (this.sec) {this.percentage.sec = this.sec; }
    if (this.isEdit) {this.percentage = this.percentageEdit; }
    setTimeout(() => {
      this.configPercentValidation();
    }, 200);
  }

  configPercentValidation() {
    const validators = [];
    // if(this.previous) {
    //   validators.push(Validators.min(Number(this.previous.percent) + 1));
    // }
    // if(this.next) {
    //   validators.push(Validators.max(Number(this.next.percent) - 1));
    // }
    // this.percentArrayValidators = validators;
    // (this.percentageForm as FormGroup).controls.percent.setValidators(Validators.compose(this.percentArrayValidators));
    // (this.percentageForm as FormGroup).controls.percent.updateValueAndValidity();
    // console.log('form - ',this.percentageForm);
  }
  configFormGroup() {
    this.percentageForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      comment: ['', Validators.compose([Validators.required])],
      startDate: [undefined, Validators.compose([Validators.required])],
      endDate: [undefined, Validators.compose([Validators.required])],
      planPercent: ['', Validators.compose([])],
      factPercent: ['', Validators.compose([])]

    });
  }

  ngOnDestroy(): void {
    if (this.onDestroy) {
      this.onDestroy();
    }
  }

  changeStartDate() {
    console.log('change start date');
    console.log(this.percentage.startDate);
  }

  changeEndDate() {

  }

  cancel() {
    this.bsModalRef.hide();
  }

  save() {
    if (this.sec) {this.percentage.sec = this.sec; }
    console.log('percentage - ', this.percentage);
    this.percentageService.save(this.percentage).subscribe(res => {
      console.log('res - ', res);
      this.cancel();
    });
  }

  edit() {
    this.percentage.sec = null;
    console.log('percentage - ', this.percentage);
    this.percentageService.edit(this.percentage).subscribe(res => {
      console.log('res - ', res);
      this.cancel();
    });
  }

}
