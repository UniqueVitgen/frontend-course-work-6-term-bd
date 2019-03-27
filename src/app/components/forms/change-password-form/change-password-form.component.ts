import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {FormBase} from '../base/form.base';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidator} from '../../../validators/password.validator';
import {UserWorker} from '../../../workers/UserWorker';
import {UserService} from '../../../services/user-service/user.service';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent extends FormBase implements OnInit {
  passwordForm: FormGroup;

  constructor(protected bsModalRef: BsModalRef,
              public userWorker: UserWorker,
              private userService: UserService,
              private formBuilder: FormBuilder) {
    super(bsModalRef);
  }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['']
    },
      {
        validator: PasswordValidator.MatchPassword
      });
  }
  editPassword() {
    const {password} = this.passwordForm.getRawValue();
    this.userService.editPassword(this.object, password).subscribe(result => {
      this.cancel();
    });
  }

}
