import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../../../../services/sign-up/sign-up.service';
import { LectorService } from '../../../../services/lector-service/lector.service';
import { FormsModule, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { PasswordValidator } from '../../../../validators/password.validator';
import { AuthService } from '../../../../services/auth/auth.service';
import { TokenStorage } from '../../../../storage/token/TokenStorage';
import { Router } from '@angular/router';
import { UserStorage } from '../../../../storage/user/UserStorage';
import { DegreeService } from '../../../../services/degree/degree.service';
import { TitleService } from '../../../../services/title/title.service';
import { PostService } from '../../../../services/post/post.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SignInComponent } from '../../../../components/forms/sign-in/sign-in.component';
import { UniversityService } from '../../../../services/university/university.service';
import { FacultyService } from '../../../../services/faculty/faculty.service';
import { University } from '../../../../factory/university.factory';
import { DepartmentService } from '../../../../services/department/department.service';

@Component({
  selector: 'app-sign-up-lector',
  templateUrl: './sign-up-lector.component.html',
  styleUrls: ['./sign-up-lector.component.css'],
  providers: [
    FormBuilder
  ]
})
export class SignUpLectorComponent implements OnInit {

  public lector = {
    username: '',
    firstname: '',
    lastname: '',
    middlename: '',
    university: undefined,
    universities: [],
    faculty: undefined,
    faculties: [],
    department: undefined, 
    departments: [],
    title: undefined,
    titles: [],
    post: undefined,
    posts: [],
    degree: undefined,
    degrees: [],
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
    title: undefined,
    department: undefined,
    post: undefined,
    degree: undefined,
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
    public degreeService: DegreeService,
    public titleService: TitleService,
    public postService: PostService,
    public universityService: UniversityService,
    public facultyService: FacultyService,
    public departmentService: DepartmentService,
    private modalService: BsModalService,
    
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
      title: ['', Validators.compose([Validators.required])],
      university: ['', Validators.compose([Validators.required])],
      faculty: ['',  Validators.compose([Validators.required])],
      department: ['',  Validators.compose([Validators.required])],
      post: ['', Validators.compose([Validators.required])],
      degree: ['', Validators.compose([Validators.required])],
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

  getDegrees() {
    this.degreeService.getAll().subscribe(data => {
      console.log('degree -',data);
      this.lector.degrees = data;
    })
  }

  loginForm() {
    let modalOptions = {
      // initialState: initialState,
      class:'login-form',
      ignoreBackdropClick: true

    }
    this.modalService.show(SignInComponent, modalOptions)
  }

  getTitles() {
    this.titleService.getAll().subscribe(data => {
      console.log('title -',data);
      this.lector.titles = data;
    })

  }

  getPosts() {
    this.postService.getAll().subscribe(data => {
      console.log('post -',data);
      this.lector.posts = data;
    })

  }

  getAll() {
    this.getDegrees();
    this.getTitles();
    this.getPosts();
    this.getUniveristies();
  }

  getUniveristies() {
    this.universityService.getAll().subscribe(resUniversities => {
      this.lector.universities = resUniversities;
    })
  }

  changeUniversity() {
    this.facultyService.getAllByUniversity(this.lector.university).subscribe(resFaculties => {
      console.log('res - ', resFaculties);
      this.lector.faculties = resFaculties;
    })
  }
  
  changeFaculty() {
    console.log('res - ');
    this.departmentService.getAllByFaculty(this.lector.faculty).subscribe(resDepartments => {
      console.log('res - ', resDepartments);
      this.lector.departments = resDepartments;
    })
  }
  changeDepartment() {
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
    this.signUpService.signUpLector(this.lectorSend).subscribe(res => {
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
