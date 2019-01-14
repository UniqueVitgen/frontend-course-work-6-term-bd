import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { PasswordValidator } from '../../../../validators/password.validator';
import { SignUpService } from '../../../../services/sign-up/sign-up.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { FacultyService } from '../../../../services/faculty/faculty.service';
import { SpecializationService } from '../../../../services/specialization/specialization.service';
import { GroupService } from '../../../../services/group/group.service';
import { TokenStorage } from '../../../../storage/token/TokenStorage';
import { UserStorage } from '../../../../storage/user/UserStorage';
import { BsModalService } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { SignInComponent } from '../../../../components/forms/sign-in/sign-in.component';

@Component({
  selector: 'app-sign-up-organizer',
  templateUrl: './sign-up-organizer.component.html',
  styleUrls: ['./sign-up-organizer.component.css']
})
export class SignUpOrganizerComponent implements OnInit {

  public organizer = {
    username: '',
    firstname: '',
    middlename: '',
    lastname: '',
    password: '',
    confirmPassword: ''
  }

  isUsernameExist = false;

  public organizerSend = {
    username: '',
    firstname: '',
    middlename: '',
    lastname: '',
    password: ''
  }

  public organizerForm;
  public PasswordValidators = PasswordValidator;
  public onlyLettersAlert = 'Только символы русского и латинского алфавита';


  constructor(
    public signUpService: SignUpService,
    public authService: AuthService,
    public facultyService: FacultyService,
    public specializationServive: SpecializationService,
    public groupService: GroupService,
    public tokenStorage: TokenStorage,
    public userStorage: UserStorage,
    private modalService: BsModalService,
    public router: Router,
    // public passwordValidator: PasswordValidator,
    public formBuilder: FormBuilder) {
    this.organizerForm = this.formBuilder.group({
      login: ['', Validators.compose([Validators.required, Validators.pattern(PasswordValidator.atLeastOneLetterOfLettersAndNumbers)])],
      firstname: ['', Validators.compose([Validators.required, Validators.pattern(PasswordValidator.onlyRussianLetters)])],
      lastname: ['', Validators.compose([Validators.required, Validators.pattern(PasswordValidator.onlyRussianLetters)])],
      middlename: ['', Validators.compose([Validators.required, Validators.pattern(PasswordValidator.onlyRussianLetters)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([])]
    },
      {
        validator: PasswordValidator.MatchPassword
      });
    // this.PasswordValidators.atLeastOneLetterOfLettersAndNumbersAlert
    // this.facultyService.getAll().subscribe(data => {
    //   console.log('data - ', data);
    //   this.organizer.faculties = data;
    //   this.organizer.selectedFaculty = data[0];
    // });
    // this.specializationServive.getByFaculty(1).subscribe(data => {
    //   console.log('spec - ', data);
    // })
  }

  ngOnInit() {
  }

  loginForm() {
    let modalOptions = {
      // initialState: initialState,
      class:'login-form',
      ignoreBackdropClick: true

    }
    this.modalService.show(SignInComponent, modalOptions)
  }

  createSendLectorObject() {
    for (let property in this.organizerSend) {
      this.organizerSend[property] = this.organizer[property];
    }
  }

  getBySpecialization(specializationId) {
    this.groupService.getAllBySpecializationId(specializationId);
  }

  changeConfirmPassword() {
    console.log(this.organizerForm);
  }

  RegistrationOrganizer() {
    this.createSendLectorObject();
    console.log(this.organizer);
    this.signUpService.singUpOrganizer(this.organizerSend).subscribe(res => {
      console.log('--------------------');
      console.log('RES - ',res);
      this.isUsernameExist = false;
      this.authService.attemptAuth(this.organizerSend.username, this.organizerSend.password).subscribe(loginRes => {
        console.log('login res - ', loginRes);
        this.tokenStorage.saveToken(loginRes.token);
        this.userStorage.saveUser(loginRes.user);
        this.router.navigate(['/news']);
      }, loginErr => {
        console.log('login err - ', loginErr);

      })
    }, err => {
      console.log('--------------------');
      console.log('ERR - ',err);
      this.isUsernameExist = true;
    });
    setTimeout(() => {
      console.log('--------------------');
      
    }, 500);

  }

}
