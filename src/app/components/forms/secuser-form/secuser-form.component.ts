import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {BsModalRef, BsDatepickerDirective, BsModalService} from 'ngx-bootstrap';
import { FormEventService } from '../../../services/events/form/form-event.service';
import { SECUserService } from '../../../services/sec-user/secuser.service';
import {Person, SECUser, SECUserForm, User} from '../../../factory/user.factory';
import { SECRoleService } from '../../../services/sec-role/secrole.service';
import { SECRole } from '../../../factory/sec-roles.factory';
import {SelectLectorComponent} from '../../select/select-lector/select-lector.component';
import {Lector} from '../../../factory/lector.factory';

@Component({
  selector: 'app-secuser-form',
  templateUrl: './secuser-form.component.html',
  styleUrls: ['./secuser-form.component.css']
})
export class SECUserFormComponent implements OnInit, OnDestroy {
  startDate;
  endDate;
  diplomWork;
  secUserForm: FormGroup;
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
  targetLectors: Lector[];
  isEdit;
  onDestroy;
  percentArrayValidators;
  onSave;
  public bsModalRef2: BsModalRef

  constructor(public formBuilder: FormBuilder,
    private formEventService: FormEventService,
              private modalService: BsModalService,
    private cd: ChangeDetectorRef,
    public secRoleService: SECRoleService,
    public bsModalRef: BsModalRef, public secUserService: SECUserService) {


  }

  ngOnInit() {
    // console.log('diplomWork - ', this.diplomWork);
    this.initVariables();
    this.getSECRoles();
    this.configFormGroup();
    setTimeout(() => {
      this.configPercentValidation();
    }, 200);
  }

  selectLector() {
    let that = this;
    // this.template.createEmbeddedView(``)
    let initialState = {
      lectors: that.targetLectors,
      onDestroy: (lector: User) => {
        if (lector) {
          console.log('lector', lector);
          that.editedSecUser.firstname = lector.firstname;
          that.editedSecUser.lastname = lector.lastname;
          that.editedSecUser.user = lector;
          that.editedSecUser.middlename = lector.middlename;
          // that.editedSecUser.role =
          that.configFormGroup();
          that.cd.detectChanges();
        }
        // that[property] = lector;
        // that.selectDiplomForm.controls[property].setValue(that.formatFullName(lector));
        // console.log('thsi - ', this);
        // this.diplomWork[property] = lector;
        // console.log(this.)
      },
      // selectedLector: that[property]
    }
    let modalOptions = {
      class: 'select-lector',
      ignoreBackdropClick: true,
      initialState: initialState
    }
    this.bsModalRef2 = this.modalService.show(SelectLectorComponent, modalOptions);
  }
  createNewLector() {
    this.editedSecUser.firstname = '';
    this.editedSecUser.lastname = '';
    this.editedSecUser.middlename = '';
    this.editedSecUser.user = null;
    this.configFormGroup();
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
          middlename: '',
          user: null
        };
      }
      SECUser.assignToForm(this.editedSecUser, this.secUserEdit); 
    } else if (this.editedSecUser == null) {
      this.editedSecUser = {
        lastname: '',
        firstname: '',
        middlename: '',
        user: null
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
    if (this.editedSecUser) {
      this.secUserForm = this.formBuilder.group({
        firstname: [{value: this.editedSecUser.firstname, disabled: this.editedSecUser.user}, Validators.compose([Validators.required])],
        lastname: [{value:this.editedSecUser.lastname, disabled: this.editedSecUser.user}, Validators.compose([Validators.required])],
        middlename: [{value:this.editedSecUser.middlename, disabled: this.editedSecUser.user}, Validators.compose([Validators.required])],
        role: [{value: this.editedSecUser.role}, Validators.compose([Validators.required])]
      });
    } else {
      this.secUserForm = this.formBuilder.group({
        firstname: [{value: ''}, Validators.compose([Validators.required])],
        lastname: [{value: ''}, Validators.compose([Validators.required])],
        middlename: [{value: ''}, Validators.compose([Validators.required])],
        role: [{value: ''}, Validators.compose([Validators.required])]
      });
    }
    console.log('form', this.secUserForm);
  }

  compareFaculties(c1, c2): boolean {
    if(c1 && c2) {
      return c1 && c2 ? c1.id === c2.id : c1 === c2;
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
