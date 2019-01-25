import { Component } from '@angular/core';


import { MainComponent } from './pages/common/main/main.component';
import { AboutUsComponent } from './pages/common/about-us/about-us.component';
import { SignUpComponent } from './pages/common/sign-up/sign-up.component';
import { SignUpStudentComponent } from './pages/common/sign-up/sign-up-student/sign-up-student.component';
import { SignUpLectorComponent } from './pages/common/sign-up/sign-up-lector/sign-up-lector.component';
import { SignInComponent } from './components/forms/sign-in/sign-in.component';

import { SelectDiplomComponent } from './pages/students/select-diplom/select-diplom.component';
import { SelectTeacherComponent } from './pages/students/select-teacher/select-teacher.component';
import { LectorStaffComponent } from './pages/students/lector-staff/lector-staff.component';
import { NewsComponent } from './pages/students/news/news.component';

import { InvolveComponent } from './pages/lectors/involve/involve.component';
import { PercentageComponent } from './pages/lectors/percentage/percentage.component';
import { QueryStudentsComponent } from './pages/lectors/query-students/query-students.component';

import { GlobalEventsService } from './services/events/global/global-events.service';

import { TokenStorage } from './storage/token/TokenStorage';
import { UserStorage } from './storage/user/UserStorage';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LeaderComponent } from './pages/lectors/leader/leader.component';
import { TranslateService } from '@ngx-translate/core';
import { GroupDashboardComponent } from './pages/common/group-dashboard/group-dashboard.component';
import {LectorOrganizerComponent} from './pages/organizer/lector-organizer/lector-organizer.component';
import {User} from './factory/user.factory';
import {UserWorker} from './workers/UserWorker';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bsModalRef: BsModalRef;
  title = 'app';
  mode: any = 'unathored';
  user: User;
  unauthored = [
    { title: 'Главная', path: 'home' },
    { title: 'Регистрация', path: 'registration' },
    // { title: 'Войти', path: 'login' },
    { path: 'news', component: NewsComponent  },
    // { path: 'lector-staff', component: LectorStaffComponent  },
    // { path: 'about-us', component: SelectDiplomComponent  },

  ];

  student = [
    { path: 'diplom-work', component: NewsComponent, title: 'Дипломная работа' },
    // { path: 'select-diplom', component: NewsComponent, title:'Дипломная работа' },
    { path: 'news', component: NewsComponent, title: 'Новости' },
    { path: 'lector-staff', component: LectorStaffComponent, title: 'Преподователи' },
    { path: 'student-group', component: LectorStaffComponent, title: 'Моя Группа' },
    // { path: 'about-us', component: SelectDiplomComponent,content: [], title:'О нас' },
  ];

  lector = [
    { path: 'involve', component: LeaderComponent, title: 'Участие' },
    {  path: 'admin-news', component: NewsComponent, title: 'Новости' },
    {  path: 'groups', component: GroupDashboardComponent, title: 'Группы' },
    {  path: 'my-profile', component: GroupDashboardComponent, title: 'Мой профиль' },
    // { path: 'about-us', component: SelectDiplomComponent,content: [], title:'О нас' },
  ];

  organizer = [
    {path: 'admin-diplom-work', title: 'Дипломные работы'},
    {path: 'sec-list', title: 'ГЭК комиссия'},
    {  path: 'admin-news', component: NewsComponent, title: 'Новости' },
    {  path: 'organizer-lector', component: LectorOrganizerComponent, title: 'Преподаватели' },
    { path: 'admin-specialization', title: 'Специальность' },
    {  path: 'groups', component: GroupDashboardComponent, title: 'Группы' },
    // { path: 'about-us', component: SelectDiplomComponent,content: [], title:'О нас' },
  ];

  secretary = [
    {path: 'admin-diplom-work', title: 'Дипломные работы'},
    {path: 'sec-list', title: 'ГЭК комиссия'},
    {  path: 'admin-news', component: NewsComponent, title: 'Новости' },
    {  path: 'groups', component: GroupDashboardComponent, title: 'Группы' },
    // { path: 'about-us', component: SelectDiplomComponent,content: [], title:'О нас' },
  ];

  admin = [
    {path: 'admin-university', title: 'Университет'},
    {path: 'admin-faculty', title: 'Факультет'},
    {path: 'admin-department', title: 'Кафедра'},
    {path: 'admin-specialization', title: 'Специальность'},
    {path: 'admin-group', title: 'Группа'},
    {path: 'admin-qualifications', title: 'Квалификация'},
    {path: 'admin-degree', title: 'Степень'},
    {path: 'admin-title', title: 'Звание'},
    {path: 'admin-post', title: 'Должность'},
    {path: 'admin-users', title: 'Пользователи'},
    { path: 'admin-role', title: 'Роль' },
    {path: 'admin-diplom-work', title: 'Дипломные работы'},
    { path: 'admin-status', title: 'Статус' },
    { path: 'sec-list', title: 'ГЭК' },
    { path: 'admin-sec-role', title: 'ГЭК Роль' },
    // { path: 'about-us', title: 'О нас', component: SelectDiplomComponent,content: [] },
  ];

  constructor(private globalEventsManager: GlobalEventsService,
    private translate: TranslateService,
    private modalService: BsModalService,
    public userStorage: UserStorage,
    public userWorker: UserWorker,
    public tokenStorage: TokenStorage
  ) {
    this.translate.setDefaultLang(this.getLanguage());
    this.translate.use(this.getLanguage());
    this.userStorage.changeUser.subscribe(resUser => {
      this.user = resUser;
      console.log('this.user', this.user);
    });
    this.globalEventsManager.showStudentsNavBar.subscribe((mode: any) => {
      console.log('student user');
      this.mode = 'student';
    });

    this.globalEventsManager.showUnathoridNavBar.subscribe((mode: any) => {
      console.log('unathored user');
      this.mode = 'unathored';
    });
    this.globalEventsManager.showAdminNavBar.subscribe((mode: any) => {
      console.log('admin entered in my app');
      this.mode = 'admin';
    });
    this.globalEventsManager.showLectorNavBar.subscribe((mode: any) => {
      this.mode = 'lector';
    });
    this.globalEventsManager.showOrganizerNavBar.subscribe((mode: any) => {
      if (this.userWorker.hasLectorRole(this.user)) {
        this.mode = 'lector';
      } else {
        this.mode = 'organizer';
      }
    });
    this.globalEventsManager.showSecretaryNavBar.subscribe((mode: any) => {
      if (this.userWorker.hasLectorRole(this.user)) {
        this.mode = 'lector';
      } else {
        this.mode = 'secretary';
      }
    });
  }

  switchLanguage(language: string) {
    this.setLanguage(language);
  }

  setLanguage(lang) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  getLanguage() {
    let lang = localStorage.getItem('lang');
    console.log('llang ', lang);
    if (lang == null) {
      lang = 'ru';
    }
    return lang;
  }

  loginForm() {
    const modalOptions = {
      // initialState: initialState,
      class: 'login-form',
      ignoreBackdropClick: true

    };
    this.modalService.show(SignInComponent, modalOptions);
  }

  logout() {
    this.tokenStorage.signOut();
    this.userStorage.signOut();
  }

  unAuth() {
  }

  authStudent() {
  }
}
