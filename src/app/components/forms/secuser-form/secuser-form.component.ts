import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { BsModalRef, BsDatepickerDirective } from 'ngx-bootstrap';
import { FormEventService } from '../../../services/events/form/form-event.service';
import { SECUserService } from '../../../services/sec-user/secuser.service';
import { Person, SECUser, SECUserForm } from '../../../factory/user.factory';
import { SECRoleService } from '../../../services/sec-role/secrole.service';
import { SECRole } from '../../../factory/sec-roles.factory';

@Component({
  selector: 'app-secuser-form',
  templateUrl: './secuser-form.component.html',
  styleUrls: ['./secuser-form.component.css']
})
export class SECUserFormComponent implements OnInit {
  startDate;
  endDate;
  diplomWork;
  secUserForm;
  secUser : SECUser;
  editedSecUser: SECUserForm;
  secRoles: SECRole[];
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
  sec;
  secUserEdit: SECUser;
  isEdit;
  onDestroy;
  percentArrayValidators;
  onSave;

  constructor(public formBuilder: FormBuilder, 
    private formEventService: FormEventService,
    public secRoleService: SECRoleService,
    public bsModalRef: BsModalRef, public secUserService: SECUserService) {


    this.configFormGroup();
  }

  ngOnInit() {
    // console.log('diplomWork - ', this.diplomWork);
    this.initVariables();
    this.getSECRoles();
    setTimeout(() => {
      this.configPercentValidation();
    }, 200);
  }

  getSECRoles() {
    this.secRoleService.getAll().subscribe(roles => {
      this.secRoles = roles;
    })
  }

  initVariables() {
    if (this.startDate) {
      this.minDate = new Date(this.startDate);
    }
    if (this.isEdit) { 
      if(this.editedSecUser == null) {
        this.editedSecUser = {
          lastname: '',
          firstname: '',
          middlename: ''
        }
      }
      SECUser.assignToForm(this.editedSecUser, this.secUserEdit); 
    }
    else if(this.editedSecUser == null) {
      this.editedSecUser = {
        lastname: '',
        firstname: '',
        middlename: ''
      };
    }
    console.log('this.editedSecUser', this.editedSecUser);
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
    console.log('form - ', this.secUserForm);
  }

  configFormGroup() {
    this.secUserForm = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      middlename: ['', Validators.compose([Validators.required])],
      role: ['', Validators.compose([Validators.required])]
    })
  }

  compareFaculties(c1, c2): boolean {
    if(c1 && c2) {
      return c1 && c2 ? c1.idFaculty === c2.idFaculty : c1 === c2;
    }
  } 

  ngOnDestroy(): void {
    this.formEventService.hideSECUserForm.emit(true);
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

  public beforeSend() {
    if(this.secUser == null) {
      this.secUser = new SECUser();
    }
    SECUser.assign(this.secUser, this.editedSecUser);
    console.log('secUser - ', this.secUser);
  }

  save() {
    this.beforeSend();
    this.secUserService.saveBySec(this.sec, this.secUser).subscribe(res => {
      console.log('res - ', res);
      if(this.onSave) {
        this.onSave(res);
      }
      this.cancel();
    });
  }

  edit() {
    this.beforeSend();
    this.secUserService.edit(this.secUser).subscribe(res => {
      console.log('res - ', res);
      if(this.onSave) {
        this.onSave(res);
      }
      this.cancel();
    })
  }

}
