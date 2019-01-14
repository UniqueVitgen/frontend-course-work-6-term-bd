import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { PasswordValidator } from '../../../../validators/password.validator';
import { SignUpService } from '../../../../services/sign-up/sign-up.service';
import { LectorService } from '../../../../services/lector-service/lector.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { DegreeService } from '../../../../services/degree/degree.service';
import { TitleService } from '../../../../services/title/title.service';
import { PostService } from '../../../../services/post/post.service';
import { UniversityService } from '../../../../services/university/university.service';
import { FacultyService } from '../../../../services/faculty/faculty.service';
import { DepartmentService } from '../../../../services/department/department.service';
import { BsModalService } from 'ngx-bootstrap';
import { TokenStorage } from '../../../../storage/token/TokenStorage';
import { UserStorage } from '../../../../storage/user/UserStorage';
import { Router } from '@angular/router';
import { SignInComponent } from '../../../../components/forms/sign-in/sign-in.component';
import { OrganizationService } from '../../../../services/organization/organization.service';
import { PostOrganizationService } from '../../../../services/post-organization/post-organization.service';
import { ArrayWorker } from '../../../../workers/ArrayWorker';

@Component({
  selector: 'app-sign-up-lector-organizer',
  templateUrl: './sign-up-lector-organizer.component.html',
  styleUrls: ['./sign-up-lector-organizer.component.css']
})
export class SignUpLectorOrganizerComponent implements OnInit {

  public lector = {
    username: '',
    firstname: '',
    lastname: '',
    middlename: '',
    organization: {
      name: '',
      shortName: ''
    },
    organizations: [],
    postOrganization: {
      name: '',
      shortName: ''
    },
    postOrganizations: [],
    password: '',
    confirmPassword: '',
    description: ''
  }

  isUsernameExist = false;
  public lectorSend = {
    username: '',
    firstname: '',
    lastname: '',
    middlename: '',
    organization: undefined,
    postOrganization: undefined,
    password: '',
    description: ''
  }
  public lectorHTML = {
    login: undefined,
    firstname: undefined,
    lastname: undefined,
    middlename: undefined,
    title: undefined,
    post: undefined,
    degree: undefined,
    password: undefined,
    confirmPassword: undefined
  }

  public lectorForm;

  public login = '';
  public PasswordValidators = PasswordValidator;

  constructor(
    public signUpService: SignUpService,
    public lectorService: LectorService,
    public authService: AuthService,
    private organizationService: OrganizationService,
    private postOrganizationService: PostOrganizationService,
    private modalService: BsModalService,
    private arrayWorker: ArrayWorker,
    
    public tokenStorage: TokenStorage,
    public userStorage: UserStorage,
    public router: Router,
    public formBuilder: FormBuilder
  ) {
    this.lectorForm = this.formBuilder.group({
      login: ['', Validators.compose([Validators.required, Validators.pattern(PasswordValidator.atLeastOneLetterOfLettersAndNumbers)])],
      firstname: ['', Validators.compose([Validators.required, Validators.pattern(PasswordValidator.onlyRussianLetters)])],
      lastname: ['', Validators.compose([Validators.required, Validators.pattern(PasswordValidator.onlyRussianLetters)])],
      middlename: ['', Validators.compose([Validators.required, Validators.pattern(PasswordValidator.onlyRussianLetters)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([])],
      description: ['']

    },
      {
        validator: PasswordValidator.MatchPassword
      })
    console.log('entered in sign up student');
    setTimeout(() => {
      // this.initializeInputs();
      // this.setInputs();
    }, 5000);
    this.lectorService.getLectors().subscribe(res => {
      console.log('lectors - ', res);
    })

    this.getAll();
  }

  loginForm() {
    let modalOptions = {
      // initialState: initialState,
      class:'login-form',
      ignoreBackdropClick: true

    }
    this.modalService.show(SignInComponent, modalOptions)
  }

  search(value, array) {
    this.arrayWorker.getAllByProperty(array, value, 'name')
  }

  getAll() {
    this.getOrganizations();
    this.getPostOrganizations();
  }

  getOrganizations() {
    this.organizationService.getAll().subscribe(resOrganizations => {
      this.lector.organizations = resOrganizations;
    })
  }

  getPostOrganizations() {
    this.postOrganizationService.getAll().subscribe(resOrganizations => {
      this.lector.postOrganizations = resOrganizations;
    })
  }
  

  initializeInputs() {
    for (let property in this.lectorHTML) {
      this.lectorHTML[property] = document.getElementById(property);
    }
  }

  setInputs() {
    for (let property in this.lectorHTML) {
      this.lector[property] = this.lectorHTML[property].value;
      console.log(property, ' - ', this.lector[property]);
    }

  }

  ngOnInit() {
  }

  keyUpLogin(event) {
    console.log(event);
  }

  createSendLectorObject() {
    for (let property in this.lectorSend) {
      this.lectorSend[property] = this.lector[property];
    }
  }

  regLector() {
    this.createSendLectorObject();
    console.log('lector send - ', this.lectorSend);
    this.signUpService.signUpLectorOrganizer(this.lectorSend).subscribe(res => {
      this.isUsernameExist = false;

    this.authService.attemptAuth(this.lectorSend.username, this.lectorSend.password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.userStorage.saveUser(data.user);
        this.router.navigate(['/news']);
      },
      (err) => {
        console.log('err -', err);
        // this.loginForm.controls.isGoodCredentials.setValue( false);
        // console.log(this.loginForm);
      }
    );
      console.log('res - ',res);
    }, err => {
      this.isUsernameExist = true;
    });
  }

}
