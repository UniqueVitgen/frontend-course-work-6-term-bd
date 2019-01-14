import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsDaterangepickerDirective, BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { PostService } from '../../../services/post/post.service';
import { FormEventService } from '../../../services/events/form/form-event.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit, OnDestroy {
  startDate;
  endDate;
  diplomWork;
  postForm;
  post = {
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
  postEdit;
  isEdit;
  onDestroy;
  percentArrayValidators;

  constructor(public formBuilder: FormBuilder, 
    private formEventService: FormEventService,
    public bsModalRef: BsModalRef, public postService: PostService) {


    this.configFormGroup();
  }

  ngOnInit() {
    // console.log('diplomWork - ', this.diplomWork);
    if (this.startDate) {
      this.minDate = new Date(this.startDate);
    }
    if (this.isEdit) { this.post = this.postEdit; }
    setTimeout(() => {
      this.configPercentValidation();
    }, 200);
  }

  configPercentValidation() {
    let validators = [];
    if (this.previous) {
      validators.push(Validators.min(Number(this.previous.percent) + 1));
    }
    if (this.next) {
      validators.push(Validators.max(Number(this.next.percent) - 1));
    }
    this.percentArrayValidators = validators;
    console.log('form - ', this.postForm);
  }
  configFormGroup() {
    this.postForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],

    })
  }

  ngOnDestroy(): void {
    this.formEventService.hidePostForm.emit(true);
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

  save() {
    console.log('post - ', this.post);
    this.postService.save(this.post).subscribe(res => {
      console.log('res - ', res);
      this.cancel();
    })
  }

  edit() {
    console.log('post - ', this.post);
    this.postService.edit(this.post).subscribe(res => {
      console.log('res - ', res);
      this.cancel();
    })
  }

}
