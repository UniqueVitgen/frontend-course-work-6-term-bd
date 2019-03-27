import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BsDatepickerDirective, BsModalRef} from 'ngx-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import {FormEventService} from '../../../../../services/events/form/form-event.service';
import {DiplomWorkService} from '../../../../../services/diplom-work/diplom-work.service';

@Component({
  selector: 'app-mark-diplom-work-form',
  templateUrl: './mark-diplom-work-form.component.html',
  styleUrls: ['./mark-diplom-work-form.component.css']
})
export class MarkDiplomWorkFormComponent implements OnInit, OnDestroy {
  diplomWorkForm;
  diplomWork = {
    mark: '',
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
    if (this.isEdit) { this.diplomWork = this.diplomWorkEdit; }
  }
  configFormGroup() {
    this.diplomWorkForm = this.formBuilder.group({
      mark: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnDestroy(): void {
    this.formEventService.hideDiplomWorkForm.emit(true);
    if (this.onDestroy) {
      this.onDestroy();
    }
  }

  cancel() {
    this.bsModalRef.hide();
  }

  edit() {
    this.diplomWorkService.edit(this.diplomWork).subscribe(res => {
      console.log('res - ', res);
      this.cancel();
    });
  }

}
