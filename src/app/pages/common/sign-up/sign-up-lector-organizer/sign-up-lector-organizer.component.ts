import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordValidator} from '../../../../validators/password.validator';
import {SignUpService} from '../../../../services/sign-up/sign-up.service';
import {LectorService} from '../../../../services/lector-service/lector.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {BsModalService} from 'ngx-bootstrap';
import {TokenStorage} from '../../../../storage/token/TokenStorage';
import {UserStorage} from '../../../../storage/user/UserStorage';
import {Router} from '@angular/router';
import {SignInComponent} from '../../../../components/forms/sign-in/sign-in.component';
import {OrganizationService} from '../../../../services/organization/organization.service';
import {PostOrganizationService} from '../../../../services/post-organization/post-organization.service';
import {ArrayWorker} from '../../../../workers/ArrayWorker';
import {PostOrganization} from '../../../../factory/post-organization.factory';
import {SearchWorker} from '../../../../workers/search.worker';

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
  };

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
  };

  public lectorForm: FormGroup;

  public login = '';
  public PasswordValidators = PasswordValidator;
  public get isPostOrganizationNameExists(): boolean {
    return this.arrayWorker.containtsByProperty(this.lector.postOrganizations, this.lector.postOrganization, 'name');
  }

  public get postOrganizationMatchEnteredPostOrganizationName(): any {
    return this.arrayWorker.getAllByProperty(this.lector.postOrganizations, this.lector.postOrganization, 'name')[0];
  }
  public get postOrganizationShortNameControl(): FormControl {
    return ((this.lectorForm.controls.postOrganization as FormGroup).controls.shortName as FormControl);
  }
  public get isOrganizationNameExists(): boolean {
    return this.arrayWorker.containtsByProperty(this.lector.organizations, this.lector.organization, 'name');
  }
  public get organizationMatchEnteredOrganizationName(): any {
    return this.arrayWorker.getAllByProperty(this.lector.organizations, this.lector.organization, 'name')[0];
  }
  public get organizationShortNameControl(): FormControl {
    return ((this.lectorForm.controls.organization as FormGroup).controls.shortName as FormControl);
  }

  constructor(
    public signUpService: SignUpService,
    public authService: AuthService,
    private organizationService: OrganizationService,
    private postOrganizationService: PostOrganizationService,
    private modalService: BsModalService,
    public searchWorker: SearchWorker,
    private arrayWorker: ArrayWorker,
    public tokenStorage: TokenStorage,
    public userStorage: UserStorage,
    public router: Router,
    public formBuilder: FormBuilder
  ) {
  }
  public initData(): void {
    this.lectorForm = this.formBuilder.group({
        login: ['', Validators.compose([Validators.required, Validators.pattern(PasswordValidator.atLeastOneLetterOfLettersAndNumbers)])],
        firstname: ['', Validators.compose([Validators.required, Validators.pattern(PasswordValidator.onlyRussianLetters)])],
        lastname: ['', Validators.compose([Validators.required, Validators.pattern(PasswordValidator.onlyRussianLetters)])],
        middlename: ['', Validators.compose([Validators.required, Validators.pattern(PasswordValidator.onlyRussianLetters)])],
        organization: this.formBuilder.group({
          name: ['', Validators.compose([Validators.required])],
          shortName: ['', Validators.compose([Validators.required])]
        }),
        postOrganization: this.formBuilder.group({
          name: ['', Validators.compose([Validators.required])],
          shortName: ['', Validators.compose([Validators.required])]
        }),
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        confirmPassword: ['', Validators.compose([])],
        description: ['']

      },
      {
        validator: PasswordValidator.MatchPassword
      });

    this.getAll();
  }

  loginForm() {
    const modalOptions = {
      class: 'login-form',
      ignoreBackdropClick: true

    };
    this.modalService.show(SignInComponent, modalOptions);
  }

  search(value: {name: string}, array): any[] {
    return this.searchWorker.searchValueInsideProperty(value.name, array, 'name');
  }

  getAll() {
    this.getOrganizations();
    this.getPostOrganizations();
  }

  getOrganizations() {
    this.organizationService.getAll().subscribe(resOrganizations => {
      this.lector.organizations = resOrganizations;
    });
  }

  getPostOrganizations() {
    this.postOrganizationService.getAll().subscribe(resOrganizations => {
      this.lector.postOrganizations = resOrganizations;
    });
  }

  ngOnInit() {
    this.initData();
  }

  autocompletePost(postOrganization: PostOrganization) {
    this.lector.postOrganization = postOrganization;
  }

  changePostOrganizationName(): void {
    if (this.isPostOrganizationNameExists) {
      this.lector.postOrganization = JSON.parse(JSON.stringify(this.postOrganizationMatchEnteredPostOrganizationName));
      this.postOrganizationShortNameControl.disable();
    } else {
      this.postOrganizationShortNameControl.enable();
      this.lector.postOrganization.shortName = '';
    }
  }

  changeOrganizationName(): void {
    if (this.isOrganizationNameExists) {
      this.lector.organization = JSON.parse(JSON.stringify(this.organizationMatchEnteredOrganizationName));
      this.organizationShortNameControl.disable();
    } else {
      this.organizationShortNameControl.enable();
      this.lector.organization.shortName = '';
    }
  }

  createSendLectorObject() {
    console.log('lector', this.lector);
    for (const property in this.lectorSend) {
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
          console.error('err -', err);
        }
      );
      console.log('res - ', res);
    }, err => {
      this.isUsernameExist = true;
    });
  }

}
