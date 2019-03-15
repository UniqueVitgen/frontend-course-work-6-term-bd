import { Component, OnInit } from '@angular/core';
import { FormsModule, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { SignUpService } from '../../../../services/sign-up/sign-up.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { FacultyService } from '../../../../services/faculty/faculty.service';
import { SpecializationService } from '../../../../services/specialization/specialization.service';
import { GroupService } from '../../../../services/group/group.service';

import { PasswordValidator } from '../../../../validators/password.validator';
import { Router } from '@angular/router';
import { TokenStorage } from '../../../../storage/token/TokenStorage';
import { UserStorage } from '../../../../storage/user/UserStorage';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SignInComponent } from '../../../../components/forms/sign-in/sign-in.component';
import { UniversityService } from '../../../../services/university/university.service';
import { DepartmentService } from '../../../../services/department/department.service';

@Component({
  selector: 'app-sign-up-student',
  templateUrl: './sign-up-student.component.html',
  styleUrls: ['./sign-up-student.component.css']
})
export class SignUpStudentComponent implements OnInit {

  public student = {
    username: '',
    firstname: '',
    middlename: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    selectedFaculty: undefined,
    universities: [],
    university: undefined,
    faculties: undefined,
    departments: [],
    department: undefined,
    selectedSpecialization: undefined,
    specializations: undefined,
    // department: '',
    group: undefined,
    groups: undefined
  };

  isUsernameExist = false;

  public studentSend = {
    username: '',
    firstname: '',
    middlename: '',
    lastname: '',
    password: '',
    group: undefined
  };

  public studentForm;
  public PasswordValidators = PasswordValidator;
  public onlyLettersAlert = 'Только символы русского и латинского алфавита';


  constructor(
    public signUpService: SignUpService,
    public authService: AuthService,
    public facultyService: FacultyService,
    private universityService: UniversityService,
    public specializationServive: SpecializationService,
    private departmentService: DepartmentService,
    public groupService: GroupService,
    public tokenStorage: TokenStorage,
    public userStorage: UserStorage,
    private modalService: BsModalService,
    public router: Router,
    // public passwordValidator: PasswordValidator,
    public formBuilder: FormBuilder) {
    this.studentForm = this.formBuilder.group({
      login: ['', Validators.compose([Validators.required, Validators.pattern(PasswordValidator.atLeastOneLetterOfLettersAndNumbers)])],
      firstname: ['', Validators.compose([Validators.required, Validators.pattern(PasswordValidator.onlyRussianLetters)])],
      lastname: ['', Validators.compose([Validators.required, Validators.pattern(PasswordValidator.onlyRussianLetters)])],
      middlename: ['', Validators.compose([Validators.required, Validators.pattern(PasswordValidator.onlyRussianLetters)])],
      university: ['', Validators.compose([Validators.required])],
      faculty: ['', Validators.compose([])],
      department: ['', Validators.compose([])],
      group: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([])]
    },
      {
        validator: PasswordValidator.MatchPassword
      });
    // this.initializeFaculty();
    // this.PasswordValidators.atLeastOneLetterOfLettersAndNumbersAlert
    // this.facultyService.getAll().subscribe(data => {
    //   console.log('data - ', data);
    //   this.student.faculties = data;
    //   this.student.selectedFaculty = data[0];
    // });
    // this.specializationServive.getByFaculty(1).subscribe(data => {
    //   console.log('spec - ', data);
    // })
  }

  ngOnInit() {
    this.getUniversities();
  }

  loginForm() {
    let modalOptions = {
      // initialState: initialState,
      class:'login-form',
      ignoreBackdropClick: true

    }
    this.modalService.show(SignInComponent, modalOptions)
  }

  initializeFaculty() {
    this.facultyService.getAll().subscribe(data => {
      console.log('data - ', data);
      this.student.faculties = data;
      this.student.selectedFaculty = data[0];
    });
  }

  getUniversities() {
    this.universityService.getAll().subscribe(resUniversities => {
      this.student.universities = resUniversities;
    });
  }

  createSendLectorObject() {
    for (let property in this.studentSend) {
      this.studentSend[property] = this.student[property];
    }
  }

  getBySpecialization(specializationId) {
    this.groupService.getAllBySpecializationId(specializationId);
  }

  changeConfirmPassword() {
    console.log(this.studentForm);
  }

  changeFaculty() {
    console.log('sel fac - ', this.student.selectedFaculty);
    if(this.student.selectedFaculty) {
      this.departmentService.getAllByFaculty(this.student.selectedFaculty).subscribe(resDepartments => {
        this.student.departments = resDepartments;
      });
      // this.specializationServive.getByFaculty(this.student.selectedFaculty.idFaculty).subscribe(specializations => {
      //   this.student.specializations = specializations;
      //   // this.student.selectedSpecialization = undefined;
      // })
    }
  }

  changeUniversity() {
    this.facultyService.getAllByUniversity(this.student.university).subscribe(resFaculties => {
      console.log('res - ', resFaculties);
      this.student.faculties = resFaculties;
    })
  }
  changeDepartment() {
    this.specializationServive.getByDepartment(this.student.department.id).subscribe(resSpecializations => {
      this.student.specializations = resSpecializations;
    });
  }

  changeSpecialization() {
    console.log('sel spec - ', this.student.selectedSpecialization);
    if(this.student.selectedSpecialization) {
      this.groupService.getAllBySpecializationId(this.student.selectedSpecialization.idSpecialization).subscribe(groups => {
        this.student.groups = groups;
        setTimeout(() => {
          this.student.group = undefined;
  
        }, 0);
      })
    }
  }

  RegistrationStudent() {
    this.createSendLectorObject();
    console.log(this.student);
    this.signUpService.signUpStudent(this.studentSend).subscribe(res => {
      console.log('--------------------');
      console.log('RES - ',res);
      this.isUsernameExist = false;
      this.authService.attemptAuth(this.studentSend.username, this.studentSend.password).subscribe(loginRes => {
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
