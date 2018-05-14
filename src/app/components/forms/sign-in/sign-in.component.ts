import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorage } from '../../../storage/token/TokenStorage';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user-service/user.service';
import { FormsModule, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { PasswordValidator } from '../../../validators/password.validator';
import { UserStorage } from '../../../storage/user/UserStorage';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [
    FormBuilder
  ]
})
export class SignInComponent implements OnInit {
  public credentials = {
    username: '',
    password: '',
  }
  public loginForm;

  constructor(private router: Router,
    public tokenStorage: TokenStorage,
    public userStorage: UserStorage,
    public formBuilder: FormBuilder,
    public userService: UserService,
    public bsModalRef: BsModalRef,
    public authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, PasswordValidator.ifOtherFormControlTrue('isGoodCredentials')])],
      password: ['', Validators.compose([Validators.required, PasswordValidator.ifOtherFormControlTrue('isGoodCredentials')])],
      isGoodCredentials: [true, Validators.requiredTrue]
    });
    console.log(this.loginForm)
  }

  ngOnInit() {
  }

  login(): void {
    localStorage.setItem('student', 'true');
    console.log('username - ', this.credentials.username);
    console.log('password - ', this.credentials.password);
    this.authService.attemptAuth(this.credentials.username, this.credentials.password).subscribe(
      data => {
        // this.userService.getByUsername(this.credentials.username).subscribe(user => {
        //   console.log('user - ', user);
          console.log(data);
          this.tokenStorage.saveToken(data.token);
          this.userStorage.saveUser(data.user);
          this.cancel();
          this.router.navigate(['/news']);
        // })
      },
      (err) => {
        console.log('err -', err);
        this.loginForm.controls.isGoodCredentials.setValue(false);
        console.log(this.loginForm);
      }
    );
  }
  cancel() {
    // this.router.navigate(['admin-faculty']);
    this.bsModalRef.hide();
  }

}
